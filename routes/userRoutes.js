const express = require('express');

const router = express.Router();
const { userLogin, userSignup } = require('../controllers/authController');
// const { get}

router.post('/userLogin', userLogin);
router.post('/userSignup', userSignup);

module.exports = router;
