const express = require('express');
const router = express.Router();
const { getMyBookings, getBooking, createBooking, cancelBooking, getAllBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.get('/admin/all', protect, authorize('admin'), getAllBookings);
router.get('/', protect, getMyBookings);
router.post('/', protect, createBooking);
router.get('/:id', protect, getBooking);
router.patch('/:id/cancel', protect, cancelBooking);

module.exports = router;
