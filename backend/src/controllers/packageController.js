const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
exports.getPackages = async (req, res, next) => {
  try {
    const { category, featured, destination, page = 1, limit = 9 } = req.query;
    let query = { available: true };

    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (destination) query.destination = destination;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Package.countDocuments(query);
    const packages = await Package.find(query)
      .populate('destination', 'name country images')
      .sort('-featured -rating')
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: packages.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      packages,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
exports.getPackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id).populate('destination');
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
    res.json({ success: true, package: pkg });
  } catch (err) {
    next(err);
  }
};

// @desc    Create package (admin)
// @route   POST /api/packages
exports.createPackage = async (req, res, next) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json({ success: true, package: pkg });
  } catch (err) {
    next(err);
  }
};

// @desc    Update package (admin)
// @route   PUT /api/packages/:id
exports.updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
    res.json({ success: true, package: pkg });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete package (admin)
// @route   DELETE /api/packages/:id
exports.deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
    res.json({ success: true, message: 'Package deleted.' });
  } catch (err) {
    next(err);
  }
};
