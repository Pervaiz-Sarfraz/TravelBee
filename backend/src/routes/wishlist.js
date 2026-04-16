const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getWishlist);
router.post('/:destId', protect, addToWishlist);
router.delete('/:destId', protect, removeFromWishlist);

module.exports = router;
