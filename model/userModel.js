const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  likedSongs: {
    type: [String],
    default: [],
  },
  playlist: {
    type: [String],
    default: [],
  },
  follwedArtist: {
    type: [String],
    default: [],
  },
  profilePic: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('UserSchema', UserSchema);
module.exports = { UserModel };
