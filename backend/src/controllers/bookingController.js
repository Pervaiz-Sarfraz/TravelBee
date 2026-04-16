const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const Package = require('../models/Package');

// @desc    Get my bookings
// @route   GET /api/bookings
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('destination', 'name country images')
      .populate('package', 'title duration')
      .sort('-createdAt');

    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('destination')
      .populate('package')
      .populate('user', 'name email');

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });

    // Only owner or admin can see
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res, next) => {
  try {
    const { destinationId, packageId, checkIn, checkOut, guests, specialRequests } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ success: false, message: 'Check-in and check-out dates are required.' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({ success: false, message: 'Check-out must be after check-in.' });
    }

    let totalPrice = 0;

    if (packageId) {
      const pkg = await Package.findById(packageId);
      if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
      totalPrice = pkg.price * (guests?.adults || 1);
    } else if (destinationId) {
      const dest = await Destination.findById(destinationId);
      if (!dest) return res.status(404).json({ success: false, message: 'Destination not found.' });
      totalPrice = dest.pricePerNight * nights * (guests?.adults || 1);
    }

    const booking = await Booking.create({
      user: req.user.id,
      destination: destinationId || undefined,
      package: packageId || undefined,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests || { adults: 1, children: 0 },
      totalPrice,
      specialRequests,
    });

    const populated = await booking.populate(['destination', 'package']);
    res.status(201).json({ success: true, booking: populated });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel booking
// @route   PATCH /api/bookings/:id/cancel
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings/admin/all
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('destination', 'name country')
      .populate('package', 'title')
      .sort('-createdAt');

    const total = bookings.length;
    const revenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    res.json({ success: true, count: total, revenue, bookings });
  } catch (err) {
    next(err);
  }
};
