const express = require('express');

const router = express.Router();

const { artistSignup, artistLogin } = require('../controllers/artistAuthentication');

router.post('/signup', artistSignup);
router.post('/login', artistLogin);

module.exports = router;
