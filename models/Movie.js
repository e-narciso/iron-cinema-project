const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  director: { type : Schema.Types.ObjectId, ref: 'Director' },
  composer: { type : Schema.Types.ObjectId, ref: 'Composer' },
  starring: [ { type : Schema.Types.ObjectId, ref: 'Actor' } ],
  genre: String,
  plot: String,
  image: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  spotifyID: String,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
