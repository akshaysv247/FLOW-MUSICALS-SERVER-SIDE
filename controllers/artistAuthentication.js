const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ArtistModel = require('../model/artistModel');

module.exports = {

  artistSignup: async (req, res) => {
    // console.log(req.body);
    try {
      const {
        name,
        email,
        phone,
        password,
      } = req.body;
      if (name && email && phone && password) {
        // validation
        if (!validator.isEmail(email)) {
          return res
            .status(200)
            .send({ message: 'Email is not Valid', success: false });
        }
        if (!validator.isStrongPassword(password)) {
          return res
            .status(200)
            .send({ message: 'Password is not Strong', success: false });
        }
        const existArtist = await ArtistModel.findOne({ email: req.body.email });
        if (existArtist) {
          return res
            .status(200)
            .send({ message: 'Artist is Already exist', success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);
        const newArtist = new ArtistModel({
          // eslint-disable-next-line object-shorthand
          name: name,
          // eslint-disable-next-line object-shorthand
          email: email,
          // eslint-disable-next-line radix
          phone: parseInt(phone),
          password: hashedPassword,
        });
        await newArtist.save();
        res
          .status(201)
          .send({ message: 'Sign up successfully', success: true });
      } else {
        return res
          .status(200)
          .send({ message: 'All Fields must be filled', succes: false });
      }
    } catch (error) {
      // console.log(error)
    }
    return null;
  },
  artistLogin: async (req, res) => {
    console.log(req.body);
    try {
      if (!req.body) {
        return res
          .status(200)
          .send({ message: 'Please fill the fields', success: false });
      }
      const artist = await ArtistModel.findOne({ email: req.body.email });
      if (!artist) {
        return res
          .status(200)
          .send({ message: 'Artist Does not exist', success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, artist.password);
      if (isMatch) {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ id: artist._id }, process.env.JWT_SECRETE, {
          expiresIn: '1d',
        });
        res
          .status(201)
          .send({ message: 'Login successful', success: true, data: token });
      } else {
        return res
          .status(200)
          .send({ message: 'Error while Login', success: false });
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error while Login', success: false, err });
    }
    return null;
  },
};
