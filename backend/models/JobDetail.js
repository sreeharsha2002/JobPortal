const mongoose = require('mongoose');

const JobDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  maxapplications: {
    type: Number,
    required: true,
    min: 0,
  },
  noofapplications: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxpositions: {
    type: Number,
    required: true,
    min: 0,
  },
  noofpositions: {
    type: Number,
    default: 0,
    min: 0,
  },
  requiredskills: {
    type: [String],
    required: true,
  },
  typeofjob: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
    max: 6,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  dateofposting: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    default: 1,
  },
  noofratings: {
    type: Number,
    default: 1,
  },
});

module.exports = JobDetail = mongoose.model('jobdetail', JobDetailSchema);
