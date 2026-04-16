const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    continent: {
      type: String,
      enum: ['Asia', 'Europe', 'Americas', 'Africa', 'Oceania', 'Caribbean'],
      default: 'Caribbean',
    },
    description: { type: String, required: true },
    shortDesc: { type: String, default: '' },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ['Beach', 'Mountain', 'City', 'Island', 'Adventure', 'Cultural'],
      default: 'Beach',
    },
    pricePerNight: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    climate: { type: String, default: 'Tropical' },
    bestTimeToVisit: { type: String, default: 'Year-round' },
    highlights: [{ type: String }],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

// Text search index
destinationSchema.index({ name: 'text', country: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Destination', destinationSchema);
