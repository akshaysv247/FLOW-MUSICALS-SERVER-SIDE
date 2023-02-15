// const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel, validate } = require('../model/userModel');

module.exports = {
  // Sign up User
  userSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message, success: false });
      const {
        name, email, phone, password,
      } = req.body;
      if (name && email && phone && password) {
      //   if (!validator.isEmail(email)) {
      //     return res
      //       .status(200)
      //       .send({ message: 'Email is not valid', success: false });
      //   }
      //   if (!validator.isStrongPassword(password)) {
      //     return res
      //       .status(200)
      //       .send({ message: 'Password is not Strong', success: false });
      //   }
        const existUser = await UserModel.findOne({ email: req.body.email });
        if (existUser) {
          return res
            .status(403)
            .send({ message: 'User is already exist', sucess: false });
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);
        const newUser = new UserModel({
          name,
          email,
          // eslint-disable-next-line radix
          phone: parseInt(phone),
          password: hashedPassword,
        });
        await newUser.save();
        res
          .status(200)
          .send({ message: 'Sign up successfully', success: true });
      } else {
        return res
          .status(400)
          .send({ message: 'All fields must be filled', success: false });
      }
    } catch (error) {
      res.status(500).send({ message: `userSignup ${error.message}` });
    }
    return null;
  },
  // userSign in
  userLogin: async (req, res) => {
    try {
      if (!req.body) {
        return res
          .status(200)
          .send({ message: 'please fill out the fields', success: false });
      }
      const user = await UserModel.findOne({ email: req.body.email });
      // console.log(user);
      if (!user) {
        return res
          .status(200)
          .send({ message: 'User does not exist', success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
          expiresIn: '1d',
        });
        res
          .status(201)
          .send({ message: 'Login Successful', success: true, data: token });
      } else {
        return res
          .status(200)
          .send({ message: 'Password is incorrect', success: false });
      }
    } catch (error) {
      // console.log(error);
      res
        .status(500)
        .send({ message: 'Error while Login ', success: false, error });
    }
    return null;
  },
};
