const mongoose = require('mongoose')
const superhandyReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const SuperhandyReview = mongoose.model('SuperhandyReview', superhandyReviewSchema)

module.exports = SuperhandyReview
