const fs = require("fs");
const Movie = require("../schemas/Movie");
const TorrentStream = require("torrent-stream");

const options = {
    connections: 100,
    uploads: 10,
    path: "/goinfre", // Where to save the files. Overrides `tmp`.
    verify: true,
    tracker: true, // Whether or not to use trackers from torrent file or magnet link
    // Defaults to true
    trackers: [
        "udp://tracker.openbittorrent.com:80",
        "udp://tracker.ccc.de:80",
        "udp://tracker.leechers-paradise.org:6969/announce",
        "udp://tracker.pirateparty.gr:6969/announce",
        "udp://tracker.coppersurfer.tk:6969/announce",
        "http://asnet.pw:2710/announce",
        "http://tracker.opentrackr.org:1337/announce",
        "udp://tracker.opentrackr.org:1337/announce",
        "udp://tracker1.xku.tv:6969/announce",
        "udp://tracker1.wasabii.com.tw:6969/announce",
        "udp://tracker.zer0day.to:1337/announce",
        "udp://p4p.arenabg.com:1337/announce",
        "http://tracker.internetwarriors.net:1337/announce",
        "udp://tracker.internetwarriors.net:1337/announce",
        "udp://allesanddro.de:1337/announce",
        "udp://9.rarbg.com:2710/announce",
        "udp://tracker.dler.org:6969/announce",
        "http://mgtracker.org:6969/announce",
        "http://tracker.mg64.net:6881/announce",
        "http://tracker.devil-torrents.pl:80/announce",
        "http://ipv4.tracker.harry.lu:80/announce",
        "http://tracker.electro-torrent.pl:80/announce"
    ]
};

module.exports = {
    streamMovie: async (res, path, start, end) => {
        console.log("recu");
        let stream = file
            .createReadStream({
                start: start,
                end: end
            })
            .on("open", () => {
                stream.pipe(res);
            });
    },
    getMovieStream: async (req, res) => {
        var pathFile = await module.exports.movieExists(
            req.params.movieId,
            req.params.quality
        );
        console.log(pathFile);
        if (pathFile !== undefined) {
            const stat = fs.statSync(pathFile);
            const fileSize = stat.size;
            var otherstart = 0;
            var otherend = fileSize - 1;
            const range = req.headers.range;
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = end - start + 1;

                const head = {
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4"
                };
                res.writeHead(206, head);
                module.exports.streamMovie(res, pathFile, start, end);
            } else {
                const head = {
                    "Content-Length": fileSize,
                    "Content-Type": "video/mp4"
                };
                res.writeHead(200, head);
                module.exports.streamMovie(res, pathFile, otherstart, otherend);
            }
        } else
            module.exports.downloadMovie(
                req,
                req.params.movieId,
                req.params.quality
            );
    },

    movieExists: async (movieId, quality) => {
        try {
            var customPath = "path" + quality;
            Movie.findOne({ imdbId: movieId }, (err, result) => {
                if (result[customPath]) {
                    console.log(result[customPath]);
                    return result[customPath];
                }
            });
        } catch (err) {
            throw err;
        }
        return undefined;
    },

    downloadMovie: async (req, movieId, quality) => {
        console.log("Processing download...");
        try {
            Movie.findOne({ imdbId: movieId }, (err, result) => {
                if (err) return "No movie corresponding...";
                var magnet = undefined;
                result.torrents.forEach(element => {
                    if (element.quality === quality) magnet = element.magnet;
                });
                if (magnet !== undefined) {
                    magnet = magnet.split("/");
                    magnet = magnet[magnet.length - 1];
                    console.log("Magnet link: ", magnet);
                    const engine = TorrentStream(magnet, options);

                    var newFilePath;
                    let fileSize;

                    engine
                        .on("ready", () => {
                            engine.files.forEach(file => {
                                var ext = file.name.split(".", -1);
                                if (
                                    ext === "mp4" ||
                                    ext === "mkv" ||
                                    ext === "avi" ||
                                    ext === "ogg"
                                ) {
                                    //file.select();
                                    fileSize = file.length;
                                    newFilePath = "/goinfre/" + file.path;

                                    const range = req.headers.range;
                                    if (range) {
                                        const parts = range
                                            .replace(/bytes=/, "")
                                            .split("-");
                                        const start = parseInt(parts[0], 10);
                                        const end = parts[1]
                                            ? parseInt(parts[1], 10)
                                            : fileSize - 1;
                                        const chunksize = end - start + 1;

                                        const head = {
                                            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                                            "Accept-Ranges": "bytes",
                                            "Content-Length": chunksize,
                                            "Content-Type": "video/mp4"
                                        };
                                        res.writeHead(206, head);
                                        console.log("test1");
                                        module.exports.streamMovie(
                                            res,
                                            file,
                                            start,
                                            end
                                        );
                                    } else {
                                        console.log("test1");

                                        const head = {
                                            "Content-Length": fileSize,
                                            "Content-Type": "video/mp4"
                                        };
                                        res.writeHead(200, head);
                                        module.exports.streamMovie(
                                            res,
                                            file,
                                            0,
                                            fileSize - 1
                                        );
                                    }
                                }
                            });
                        })
                        .on("download", () => {
                            const downloaded =
                                Math.round(
                                    (engine.swarm.downloaded / fileSize) *
                                        100 *
                                        100
                                ) / 100;

                            console.log("Downloded: " + downloaded + "%");
                        })
                        .on("idle", () => {
                            console.log("Download complete!");
                            var update = "path" + quality;
                            result[update] = newFilePath;
                            result.save();
                        });
                }
            });
        } catch (err) {}
    }
};
