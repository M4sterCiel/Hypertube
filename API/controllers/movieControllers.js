const fs = require("fs");
const mime = require("mime");
const pump = require("pump");
const ffmpeg = require("fluent-ffmpeg");
const Movie = require("../schemas/Movie");
const User = require("../schemas/User");
const download = require("download");
const TorrentStream = require("torrent-stream");
const OS = require("opensubtitles-api");
const OpenSubtitles = new OS("TemporaryUserAgent");

const options = {
    connections: 100,
    uploads: 10,
    path: process.cwd() + "/API/torrents", // Where to save the files. Overrides `tmp`.
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
    getSubtitles: (req, res, next) => {
        var movieId = req.params.movieId;
        OpenSubtitles.search({
            sublanguageid: ["fre", "eng", "spa"].join(),
            extensions: "srt",
            imdbid: movieId
        }).then(subtitles => {
            var subPath = process.cwd() + "/src/subtitles/";
            var subPathEn = undefined;
            var subPathEs = undefined;
            var subPathFr = undefined;
            if (
                subtitles.en &&
                subtitles.en.vtt &&
                !fs.existsSync(subPath + movieId + "_" + "en.vtt")
            ) {
                //console.log("Starting conversion...");

                let torrent = path.createReadStream({
                    start: start,
                    end: end
                });

                let stream = ffmpeg({
                    source: torrent
                })
                    .videoCodec("libvpx")
                    .videoBitrate(1024)
                    .audioCodec("libopus")
                    .audioBitrate(128)
                    .outputOptions([
                        "-crf 30",
                        "-deadline realtime",
                        "-cpu-used 2",
                        "-threads 3"
                    ])
                    .format("webm")
                    .on("progress", progress => {
                       // console.log(progress);
                    })
                    .on("start", cmd => {
                        //console.log(cmd);
                        console.log("Starting conversion...");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (fs.existsSync(subPath + movieId + "_" + "es.vtt")) {
                var subPathEs = subPath + movieId + "_" + "es.vtt";
            }
            if (
                subtitles.fr &&
                subtitles.fr.vtt &&
                !fs.existsSync(subPath + movieId + "_" + "fr.vtt")
            ) {
                download(subtitles.fr.vtt)
                    .then(data => {
                        fs.writeFileSync(
                            subPath + movieId + "_" + "fr.vtt",
                            data
                        );
                        subPathFr = subPath + movieId + "_" + "fr.vtt";
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (fs.existsSync(subPath + movieId + "_" + "fr.vtt")) {
                var subPathFr = subPath + movieId + "_" + "fr.vtt";
            }
            return res.status(200).json({ subPathEn, subPathEs, subPathFr });
        });
    },

    convertVideo: (res, path) => {
        console.log("Starting conversion...");
        let stream = path.createReadStream({
            start: start,
            end: end
        });

        ffmpeg({
            source: stream
        })
            .videoCodec("libvpx")
            .videoBitrate(1024)
            .audioCodec("libopus")
            .audioBitrate(128)
            .outputOptions([
                "-crf 30",
                "-deadline realtime",
                "-cpu-used 2",
                "-threads 3"
            ])
            .format("webm")
            .on("progress", progress => {
                console.log(progress);
            })
            .on("start", cmd => {
                console.log(cmd);
                console.log("Starting conversion...");
            })
            .on("error", (err, stdout, stderr) => {
                console.log("Cannot process video: " + err.message);
            })
            .stream(res, {});
    },

    streamMovie: async (res, path, start, end, mode) => {
        if (mode === 1) {
            if (
                mime.getType(path.name) !== "video/mp4" &&
                mime.getType(path.name) !== "video/ogg"
            ) {
                module.exports.convertVideo(res, path);
            } else {
                let stream = path.createReadStream({
                    start: start,
                    end: end
                });
                pump(stream, res);
            }
        } else if (
            mime.getType(path) !== "video/mp4" &&
            mime.getType(path) !== "video/ogg"
        ) {
            module.exports.convertVideo(res, path);
        } else {
            let stream = fs.createReadStream(path, {
                start: start,
                end: end
            });
            pump(stream, res);
        }
    },

    getMovieStream: async (req, res) => {
        var customPath = req.params.quality + "_" + req.params.source;
        Movie.findOne({ imdbId: req.params.movieId }, (err, result) => {
            if (err || result === null)
                return res
                    .status(404)
                    .json({ error: "No movie corresponding..." });
            User.findOne({ _id: req.params.uid }, (err, user) => {
<<<<<<< HEAD
                if (err)
                    return; /* res
                        .status(404)
                        .json({ error: "No user corresponding..." }); */
=======
                if (err) console.log(err);
>>>>>>> mascagli
                var exists = false;
                user.movies_seen.forEach(e => {
                    if (e === req.params.movieId) exists = true;
                });
                if (!exists) {
                    user.movies_seen.push(req.params.movieId);
                    user.save();
                }
            });
            var pathFile = undefined;
            if (result && result.path) {
                result.path.forEach(e => {
                    if (e[customPath]);
                    pathFile = e[customPath];
                });
                //console.log(fs.existsSync(pathFile));
                if (pathFile !== undefined && fs.existsSync(pathFile)) {
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
                        req.params.source
                    );
            } else
                module.exports.downloadMovie(
                    req,
                    res,
                    req.params.movieId,
                    req.params.quality,
                    req.params.source
                );
            result.lastViewed = new Date();
            result.save();
        });
    },

    downloadMovie: async (req, res, movieId, quality, source) => {
        try {
            Movie.findOne({ imdbId: movieId }, (err, result) => {
                if (err || result === null)
                    return res
                        .status(404)
                        .json({ error: "No movie corresponding..." });
                else if (result) {
                    console.log("Processing download...");
                    var magnet = undefined;
                    result.torrents.forEach(element => {
                        if (
                            element.quality === quality &&
                            element.source === source
                        )
                            magnet = element.magnet;
                    });
                    if (magnet !== undefined) {
                        if (source === "Popcorn Time") {
                            magnet = magnet.split(":")[3];
                            magnet = magnet.split("&")[0];
                        } else {
                            magnet = magnet.split("/");
                            magnet = magnet[magnet.length - 1];
                        }
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
                                        newFilePath =
                                            process.cwd() +
                                            "/API/torrents/" +
                                            file.path;

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
                                                        : "video/webm",
                                                Connection: "keep-alive"
                                            };
                                            if (
                                                mime.getType(file.path) ==
                                                    "video/mp4" ||
                                                mime.getType(file.path) ==
                                                    "video/ogg"
                                            )
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
                                    } else {
                                        file.deselect();
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
                                var update = quality + "_" + source;
                                result.path.push({
                                    [update]: newFilePath
                                });
                                result.lastViewed = new Date();
                                result.save();
                            });
                    } else
                        return res
                            .status(404)
                            .json({ error: "No movie corresponding..." });
                } else
                    return res
                        .status(404)
                        .json({ error: "No movie corresponding..." });
            });
        } catch (err) {}
    },

    getMoviesFromImdbIdArray: async (req, res, next) => {
        await Movie.find({ imdbId: { $in: req.body.imdbIdArray} }, async function(err, movies) {
            if (err) {
                return res.status(400).json({ error: 'Impossible to retrieve movies...' });
            }
            if (!movies) {
                return res.status(400).json({ error: 'Impossible to retrieve movies...' });
            } else {
                return res.status(200).json({ moviesList: movies})
            }
        })
    }
};