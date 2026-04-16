const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: { type: String, trim: true, maxlength: 100 },
    comment: {
      type: String,
      required: true,
      maxlength: [500, 'Review cannot exceed 500 characters'],
    },
    helpful: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// One review per user per destination
reviewSchema.index({ user: 1, destination: 1 }, { unique: true });

// Update destination rating after review save
reviewSchema.statics.calcAverageRating = async function (destinationId) {
  const stats = await this.aggregate([
    { $match: { destination: destinationId } },
    {
      $group: {
        _id: '$destination',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model('Destination').findByIdAndUpdate(destinationId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.destination);
});

reviewSchema.post('remove', function () {
  this.constructor.calcAverageRating(this.destination);
});

module.exports = mongoose.model('Review', reviewSchema);
