const MovieModel = require('../schemas/Movie');

const search = async (req, res) => {
    try {
        const { genre, ratings, years, page, limit, keywords } = req.body;
        const sorting = {};
        sorting['rating'] = -1;
        const skip = limit * (page - 1);
        const count = limit * page;
        const queryTerms = [
            { $match: {
                year: { $gte: years[0], $lte: years[1] },
                rating: { $gte: ratings[0], $lte: ratings[1] }
            }},
            { $sort: sorting },
            { $limit: count },
            { $skip: skip },
        ]
        if (keywords !== '')
            queryTerms.unshift({ $match: { ...queryTerms.$match, title: { $regex: keywords.toLowerCase()}}});
        if (genre !== 'All')
            queryTerms.unshift({ $match: { ...queryTerms.$match, genres: genre.toLowerCase()}});
        movieList = await MovieModel.aggregate(queryTerms);
        res.status(200).json(movieList);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    search
}