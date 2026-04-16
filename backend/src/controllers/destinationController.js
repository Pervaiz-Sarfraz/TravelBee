const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
exports.getDestinations = async (req, res, next) => {
  try {
    const { search, category, continent, minPrice, maxPrice, featured, page = 1, limit = 12 } = req.query;

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) query.category = category;
    if (continent) query.continent = continent;
    if (featured === 'true') query.featured = true;
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Destination.countDocuments(query);
    const destinations = await Destination.find(query).sort('-featured -rating').skip(skip).limit(Number(limit));

    res.json({
      success: true,
      count: destinations.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      destinations,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
exports.getDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }
    res.json({ success: true, destination });
  } catch (err) {
    next(err);
  }
};

// @desc    Create destination (admin)
// @route   POST /api/destinations
exports.createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (err) {
    next(err);
  }
};

// @desc    Update destination (admin)
// @route   PUT /api/destinations/:id
exports.updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }
    res.json({ success: true, destination });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete destination (admin)
// @route   DELETE /api/destinations/:id
exports.deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }
    res.json({ success: true, message: 'Destination deleted.' });
  } catch (err) {
    next(err);
  }
};
