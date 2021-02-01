module.exports = function (req, res, next) {
  if (req.user.jobType != 'Recruiter') {
    return res.status(401).json({ msg: 'Is not an Recruiter' });
  }
  next();
};
