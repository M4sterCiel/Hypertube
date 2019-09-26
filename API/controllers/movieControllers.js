const fs = require("fs");
const Movie = require("../schemas/Movie");
const TorrentStream = require("torrent-stream");

const options = {
    connections: 100,
    uploads: 10,
    tmp: "/tmp",
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
    getMovieStream: async (req, res) => {
        module.exports.downloadMovie("tt8328716", "720p");
        const path = "API/torrents/" + req.params.movie;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = end - start + 1;
            const file = fs.createReadStream(path, { start, end });
            const head = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4"
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4"
            };
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    },

    movieExists: async (movieId, quality) => {
        try {
            var path = movieId + "_" + quality;
        } catch (err) {}
    },

    downloadMovie: async (movieId, quality) => {
        console.log("Processing download...");
        try {
            Movie.findOne({ imdbId: movieId }, (err, result) => {
                if (err) return "No movie corresponding...";
                var magnet = undefined;
                result.torrents.forEach(element => {
                    if (element.quality === quality) magnet = element.magnet;
                });
                if (magnet !== undefined) {
                    console.log("Magnet link: ", magnet);
                    const engine = TorrentStream(
                        "3F777779858541656E93A1687BAC8ED272F4E9B7",
                        options
                    );

                    engine
                        .on("ready", function() {
                            engine.files.forEach(function(file) {
                                console.log("filename:", file.name);
                                var stream = file.createReadStream();
                                // stream is readable stream to containing the file content
                            });
                        })
                        .on("download", () => {
                            const downloaded = engine.swarm.downloaded;
                            console.log(downloaded);
                        });
                }
            });
        } catch (err) {}
    }
};
