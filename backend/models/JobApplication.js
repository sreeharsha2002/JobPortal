const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobdetail',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    min: 0,
    required: true,
  },
  typeofjob: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 1,
  },
  applicantprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobApplicantprofile',
  },
  isapplicantrated: {
    type: Boolean,
    default: false,
  },
  isjobrated: {
    type: Boolean,
    default: false,
  },
  stage: {
    type: String,
    default: 'Applied',
  },
  dateofapplication: {
    type: Date,
    default: Date.now,
  },
  sop: {
    type: String,
    required: true,
  },
  dateofjoining: {
    type: Date,
  },
});

module.exports = JobApplication = mongoose.model(
  'jobapplication',
  JobApplicationSchema
);
