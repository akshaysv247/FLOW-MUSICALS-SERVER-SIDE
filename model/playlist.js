const mongoose = require('mongoose');
const joi = require('joi');

const { ObjectId } = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
  name: { type: String, require: true },
  user: { type: ObjectId, ref: 'UserModel', required: true },
  desc: { type: String },
  songs: { type: Array, default: [] },
  img: { type: String },
});

const validate = (playlist) => {
  const schema = joi.object({
    name: joi.string().required(),
    user: joi.string().required(),
    desc: joi.string().allow(''),
    songs: joi.array().items(joi.string()),
    img: joi.string().allow(''),
  });
  return schema.validate(playlist);
};

const PlaylistModel = mongoose.Model('Playlist', playlistSchema);
module.exports = { PlaylistModel, validate };
