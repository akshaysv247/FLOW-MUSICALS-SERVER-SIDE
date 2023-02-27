const song = require('../model/songModel');

module.exports = {
  addSong: async (req, res) => {
    console.log(req.body);
    const newSong = song({
      name: req.body.data.songName,
      songURL: req.body.audio,
      artist: req.body.data.artistName,
      category: req.body.data.category,
      // duration: req.body.duration,
      imgURL: req.body.img,
      language: req.body.data.language,
    });
    try {
      const savedSong = await newSong.save();
      console.log(savedSong);
      return res.status(200).send({ success: true, message: 'song added successfully', song: savedSong });
    } catch (error) {
      return res.status(400).send({ message: error.message, success: false });
    }
  },
  getOneSong: async (req, res) => {
    const filter = { _id: req.params.id };
    const data = await song.findOne(filter);
    if (data) {
      return res.status(200).send({ success: true, song: data });
    }
    return res.status(400).send({ success: false, message: 'Song not found' });
  },
  getAllSongs: async (req, res) => {
    // const options = {
    //   sort: {
    //     cretedAt: 1,
    //   },
    // };
    const data = await song.find();
    console.log(data);
    if (data) {
      return res.status(200).send({ success: true, songs: data });
    }
    return res.status(400).send({ success: false, message: 'Song not found' });
  },
};
