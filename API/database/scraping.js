const axios = require("axios");
const MovieSchema = require('../schemas/Movie');

async function connectDB() {
    console.log('Connecting to MongoDB database...');
    const mongoose = require("mongoose");
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    await mongoose.connect(
        "mongodb+srv://Team:Apkm5VCrxWTRPYxK@cluster0-shqxc.mongodb.net/hypertube_db?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
      );
    var db = mongoose.connection;
    // works only if the collection already exists
    await mongoose.connection.dropCollection("movies")
}

const scrapYTS = async () => {
    const raw = [];
    for (let i = 1; i <= 267; i++) {
        const res = await axios.get(`https://yts.lt/api/v2/list_movies.json?limit=50&page=${i}`);
            if (!res.data.data.movies) break;
        console.log(`${res.data.data.movies.length} movie(s) found on page ${i}.`);
        raw.push(...res.data.data.movies)
    }
    const formated = raw.map(movie => {
        const torrents = [];
        for (const item in movie.torrents) {
            const torrent = {
                magnet: movie.torrents[item].url,
                quality: movie.torrents[item].quality,
                language: 'en',
                seed: movie.torrents[item].seeds,
                peer: movie.torrents[item].peers,
                bytes: movie.torrents[item].size_bytes,
                fileSize: movie.torrents[item].size,
                source: 'YTS'
            }
            torrents.push(torrent);
        }
        const infos = {
            imdbId: movie.imdb_code,
            title: movie.title,
            year: movie.year,
            plot: movie.synopsis,
            runtime: movie.runtime,
            genres: movie.genres ? movie.genres.map(genre => genre.toLowerCase()) : null,
            trailer: movie.yt_trailer_code ? `http://youtube.com/watch?v=${movie.yt_trailer_code}` : null,
            poster: movie.large_cover_image,
            rating: movie.rating,
            torrents: torrents
        }
        return infos;
    })
    return formated;
}

const Scrap = async () => {
    try {
        await connectDB();
        const ytsRes = await scrapYTS();
        await MovieSchema.collection.insertMany(ytsRes);
    }
    catch (error) { log(error) }
    finally { process.exit(0) }
}

Scrap();