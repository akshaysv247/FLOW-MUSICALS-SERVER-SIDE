const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const joi = require('joi');

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  song: { type: String, required: true },
  img: { type: String, required: true },
  duration: { type: Number, required: true },

});

const validate = (song) => {
  const schema = joi.object({
    name: joi.string().required(),
    artist: joi.string().required(),
    song: joi.string().required(),
    img: joi.string().required(),
    duration: joi.string().required(),
  });
  return schema.validate(song);
};

const SongModel = mongoose.model('song', SongSchema);
module.export = { SongModel, validate };
