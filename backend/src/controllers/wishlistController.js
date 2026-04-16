const User = require('../models/User');

// @desc    Get wishlist
// @route   GET /api/wishlist
exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate(
      'wishlist',
      'name country images pricePerNight rating category'
    );
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    next(err);
  }
};

// @desc    Add to wishlist
// @route   POST /api/wishlist/:destId
exports.addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.wishlist.includes(req.params.destId)) {
      return res.status(400).json({ success: false, message: 'Already in wishlist.' });
    }
    user.wishlist.push(req.params.destId);
    await user.save();
    res.json({ success: true, message: 'Added to wishlist.' });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:destId
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.destId);
    await user.save();
    res.json({ success: true, message: 'Removed from wishlist.' });
  } catch (err) {
    next(err);
  }
};
