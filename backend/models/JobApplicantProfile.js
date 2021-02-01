const mongoose = require('mongoose');

const JobApplicantProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  phonenumber: {
    type: String,
  },
  skills: {
    type: [String],
  },
  noofapplications: {
    type: Number,
    default: 0,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      startYear: {
        type: Number,
        required: true,
        min: 1900,
        max: 2100,
      },
      endYear: {
        type: Number,
        min: 1900,
        max: 2100,
      },
    },
  ],
});

module.exports = JobApplicantProfile = mongoose.model(
  'jobApplicantprofile',
  JobApplicantProfileSchema
);
