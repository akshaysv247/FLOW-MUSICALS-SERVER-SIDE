const router = require('express').Router();
const { adminLogin } = require('../controllers/authController');
const {
  getUserDetails,
  blockUser,
  getArtistDetails,
  blockArtist,
  verifyArtist,
} = require('../controllers/adminControls');
const { addSong, getAllSongs } = require('../controllers/song');

router.post('/login', adminLogin);
router.get('/userDetails', getUserDetails);
router.get('/userblock/:id', blockUser);
router.get('/artistsDetails', getArtistDetails);
router.get('/artistblock/:id', blockArtist);
router.get('/artistVerify/:id', verifyArtist);
router.post('/addNewTrack', addSong);
router.get('/getAllSongs', getAllSongs);

module.exports = router;
