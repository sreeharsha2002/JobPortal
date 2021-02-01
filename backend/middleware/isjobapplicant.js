module.exports = function (req, res, next) {
  if (req.user.jobType != 'JobApplicant') {
    return res.status(401).json({ msg: 'Is not an applicant' });
  }
  next();
};
