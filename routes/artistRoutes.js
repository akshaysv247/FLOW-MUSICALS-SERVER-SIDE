const express = require('express');

const router = express.Router();

const { artistSignup, artistLogin } = require('../controllers/artistAuthentication');

router.post('/artistSignup', artistSignup);
router.post('/artistLogin', artistLogin);

module.exports = router;
