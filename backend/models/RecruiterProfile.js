const mongoose = require('mongoose');

const RecruiterProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  phonenumber: {
    type: String,
  },
  bio: {
    type: String,
  },
});

module.exports = RecruiterProfile = mongoose.model(
  'recruiterprofile',
  RecruiterProfileSchema
);
