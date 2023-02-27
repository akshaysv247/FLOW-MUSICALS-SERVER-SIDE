/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { UserModel } = require('../model/userModel');

module.exports = {
  // Sign up User
  userSignup: async (req, res) => {
    try {
      // eslint-disable-next-line object-curly-newline
      const { name, email, phone, password } = req.body.data;
      console.log(name, email, phone, password);
      if (name && email && phone && password) {
        if (validator.isEmail(email) === false) {
          return res
            .status(200)
            .send({ message: 'Email is not valid', success: false });
        }
        if (validator.isStrongPassword(password) === false) {
          return res
            .status(200)
            .send({ message: 'Password is not Strong', success: false });
        }
        const existUser = await UserModel.findOne({ email: email });
        if (existUser) {
          return res
            .status(200)
            .send({ message: 'User is already exist', sucess: false });
        } else {
          const salt = await bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hash(password.trim(), salt);
          const newUser = new UserModel({
            name,
            email,
            phone,
            password: hashedPassword,
          });
          await newUser.save();
          res
            .status(200)
            .send({ message: 'Sign up successfully', success: true });
        }
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
          // eslint-disable-next-line object-curly-newline
          .send({ message: 'Login Successful', success: true, token, user });
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
  // eslint-disable-next-line consistent-return
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const Admin = await UserModel.findOne({ email: email });
        console.log(Admin);
        if (!Admin) {
          return res.status(400).send({ message: 'Admin not found', success: false });
        }
        if (Admin.isAdmin === true) {
          const isMatch = await bcrypt.compare(password, Admin.password);
          if (isMatch) {
            const token = jwt.sign(
              // eslint-disable-next-line no-underscore-dangle
              { id: Admin._id },
              process.env.JWT_SECRETE,
              { expiresIn: '1d' },
            );
            res
              .status(200)
              .send({
                message: 'Login successful', success: true, token, Admin,
              });
          }
          // return res.status(400).send({ message: 'Invalid password or email', success: false });
        } else {
          return res.status(400).send({ message: 'Admin not found', success: false });
        }
      } else {
        return res
          .status(400)
          .send({ message: 'please fill all the fields', success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server error', success: false });
    }
  },
};
