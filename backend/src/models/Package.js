const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    destinationName: { type: String }, // denormalized for fast reads
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // days
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String }],
    includes: [{ type: String }],
    excludes: [{ type: String }],
    maxGuests: { type: Number, default: 10 },
    category: {
      type: String,
      enum: ['Honeymoon', 'Adventure', 'Family', 'Luxury', 'Budget', 'Solo'],
      default: 'Luxury',
    },
    featured: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    startDates: [{ type: Date }],
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
