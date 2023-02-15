const mongoose = require('mongoose');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

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
    type: Number,
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
  albums: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

const validate = (user) => {
  const schema = joi.object({
    name: joi.string().min(5).max(15).required(),
    email: joi.string().email().required(),
    phone: joi.number().required(),
    password: passwordComplexity().required(),
    languages: joi.array().items(joi.string()).allow(''),
    playlist: joi.array().items(joi.string()).allow(''),
    likedSongs: joi.array().items(joi.string()).allow(''),
    followedArtist: joi.array().items(joi.string()).allow(''),
    albums: joi.array().items(joi.string()).allow(''),
    profilePic: joi.string().allow(''),
  });
  return schema.validate(user);
};
const UserModel = mongoose.model('UserSchema', UserSchema);
module.exports = { UserModel, validate };
