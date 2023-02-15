const mongoose = require('mongoose');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  songs: {
    type: [String],
    default: [],
  },
  likedSongs: {
    type: [String],
    default: [],
  },
  followers: {
    type: Array,
  },
  albums: {
    type: [String],
    default: [],
  },
  profilePic: {
    type: String,
  },

}, {
  timestamps: true,
});

const validate = (artist) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.number().required(),
    password: passwordComplexity().required(),
    languages: joi.array().items(joi.string()).allow(''),
    songs: joi.array().items(joi.string()).allow(''),
    likedSongs: joi.array().items(joi.string()).allow(''),
    followers: joi.array().items(joi.number()).allow(null),
    albums: joi.array().items(joi.string()).allow(''),
    profilePic: joi.string().allow(''),
  });
  schema.validate(artist);
};

const artistModel = mongoose.model('ArtistSchema', ArtistSchema);
module.exports = { artistModel, validate };
