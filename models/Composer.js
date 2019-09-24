const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const composerSchema = new Schema({
  name: String,
  otherProjects: Array,
  catchPhrase: String,
  image: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
});

const Composer = mongoose.model("Composer", composerSchema);

module.exports = Composer;