const Review = require('../models/Review');
const Destination = require('../models/Destination');

// @desc    Get reviews for a destination
// @route   GET /api/reviews/destination/:destId
exports.getDestinationReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ destination: req.params.destId })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    next(err);
  }
};

// @desc    Create review
// @route   POST /api/reviews
exports.createReview = async (req, res, next) => {
  try {
    const { destinationId, rating, title, comment } = req.body;

    if (!destinationId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Destination, rating, and comment are required.' });
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found.' });

    const existing = await Review.findOne({ user: req.user.id, destination: destinationId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this destination.' });
    }

    const review = await Review.create({
      user: req.user.id,
      destination: destinationId,
      rating,
      title,
      comment,
    });

    await review.populate('user', 'name avatar');
    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const destinationId = review.destination;
    await review.deleteOne();
    await Review.calcAverageRating(destinationId);

    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    next(err);
  }
};
