const fs = require("fs");
const mime = require("mime");
const pump = require("pump");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
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
    streamMovie: async (res, path, start, end, mode) => {
        if (mode === 1) {
            console.log(mime.getType(path.name));
            if (
                mime.getType(path.name) !== "video/mp4" &&
                mime.getType(path.name) !== "video/ogg"
            ) {
                console.log("Starting conversion...");

                let torrent = path.createReadStream({
                    start: start,
                    end: end
                });

                var stream = ffmpeg(torrent)
                    .videoCodec("libvpx")
                    .audioCodec("libopus")
                    .audioBitrate(128)
                    .videoBitrate(1024)
                    .format("webm")
                    .outputOptions([
                        "-crf 30",
                        "-deadline realtime",
                        "-cpu-used 2",
                        "-threads 3"
                    ])
                    .on("progress", progress => {
                        /* console.log(
                            "Converting " + progress.percent + "% done"
                        );
                        console.log("TEST >>>> ", progress); */
                    })
                    .on("error", (err, stdout, stderr) => {
                        console.log("Cannot process video: " + err.message);
                        console.log("ffmpeg stdout: " + stdout);
                        console.log("ffmpeg stderr: " + stderr);
                    })
                    .on("end", () => {
                        console.log("Converting is done !");
                    });

                pump(stream, res);
            } else {
                let stream = path.createReadStream({
                    start: start,
                    end: end
                });
                pump(stream, res);
            }
        } else {
            //console.log(mime.getType(path));
            let stream = fs.createReadStream(path, {
                start: start,
                end: end
            });
            pump(stream, res);
        }
    },

    getMovieStream: async (req, res) => {
        var customPath = "path" + req.params.quality;
        Movie.findOne({ imdbId: req.params.movieId }, (err, result) => {
            if (err)
                return res
                    .status(404)
                    .json({ error: "No movie corresponding..." });
            if (result && result[customPath]) {
                var pathFile = result[customPath];

                const stat = fs.statSync(pathFile);
                const fileSize = stat.size;
                var otherstart = 0;
                var otherend = fileSize - 1;
                const range = req.headers.range;
                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1]
                        ? parseInt(parts[1], 10)
                        : fileSize - 1;
                    const chunksize = end - start + 1;

                    const head = {
                        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunksize,
                        "Content-Type": mime.getType(pathFile)
                    };
                    res.writeHead(206, head);
                    module.exports.streamMovie(res, pathFile, start, end);
                } else {
                    const head = {
                        "Content-Length": fileSize,
                        "Content-Type": mime.getType(pathFile)
                    };
                    res.writeHead(200, head);
                    module.exports.streamMovie(
                        res,
                        pathFile,
                        otherstart,
                        otherend,
                        0
                    );
                }
            } else
                module.exports.downloadMovie(
                    req,
                    res,
                    req.params.movieId,
                    req.params.quality,
                    0
                );
        });
    },

    downloadMovie: async (req, res, movieId, quality) => {
        try {
            Movie.findOne({ imdbId: movieId }, (err, result) => {
                if (err)
                    return res
                        .status(404)
                        .json({ error: "No movie corresponding..." });
                else if (result) {
                    console.log("Processing download...");
                    var magnet = undefined;
                    result.torrents.forEach(element => {
                        if (element.quality === quality)
                            magnet = element.magnet;
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
                                    var ext = file.name.substr(-4, 4);
                                    if (
                                        ext === ".mp4" ||
                                        ext === ".mkv" ||
                                        ext === ".avi" ||
                                        ext === ".ogg"
                                    ) {
                                        file.select();
                                        if (ext !== ".mp4" && ".ogg")
                                            ext = ".webm";
                                        fileSize = file.length;
                                        newFilePath = "/goinfre/" + file.path;

                                        const range = req.headers.range;
                                        if (range) {
                                            const parts = range
                                                .replace(/bytes=/, "")
                                                .split("-");
                                            const start = parseInt(
                                                parts[0],
                                                10
                                            );
                                            const end = parts[1]
                                                ? parseInt(parts[1], 10)
                                                : fileSize - 1;
                                            const chunksize = end - start + 1;

                                            const head = {
                                                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                                                "Accept-Ranges": "bytes",
                                                "Content-Length": chunksize,
                                                "Content-Type":
                                                    mime.getType(file.name) ===
                                                        "video/mp4" ||
                                                    mime.getType(file.name) ===
                                                        "video/ogg"
                                                        ? mime.getType(
                                                              file.name
                                                          )
                                                        : "video/webm"
                                            };
                                            res.writeHead(206, head);
                                            module.exports.streamMovie(
                                                res,
                                                file,
                                                start,
                                                end,
                                                1
                                            );
                                        } else {
                                            const head = {
                                                "Content-Length": fileSize,
                                                "Content-Type":
                                                    mime.getType(file.name) ===
                                                        "video/mp4" ||
                                                    mime.getType(file.name) ===
                                                        "video/ogg"
                                                        ? mime.getType(
                                                              file.name
                                                          )
                                                        : "video/webm"
                                            };
                                            res.writeHead(200, head);
                                            module.exports.streamMovie(
                                                res,
                                                file,
                                                0,
                                                fileSize - 1,
                                                1
                                            );
                                        }
                                    } else file.deselect();
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
                                /*                                 engine.destroy(() => {});
                                 */
                            });
                    }
                } else
                    return res
                        .status(404)
                        .json({ error: "No movie corresponding..." });
            });
        } catch (err) {}
    }
};
