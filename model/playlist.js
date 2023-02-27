const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    user: { type: ObjectId, ref: 'UserModel', required: true },
    desc: { type: String },
    songs: { type: Array, default: [] },
    imgURL: { type: String },
  },
  { timestamps: true },
);

const PlaylistModel = mongoose.Model('Playlist', playlistSchema);
module.exports = PlaylistModel;
