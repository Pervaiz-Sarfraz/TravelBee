const express = require('express');
const router = express.Router();
const { getPackages, getPackage, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getPackages);
router.get('/:id', getPackage);
router.post('/', protect, authorize('admin'), createPackage);
router.put('/:id', protect, authorize('admin'), updatePackage);
router.delete('/:id', protect, authorize('admin'), deletePackage);

module.exports = router;
