const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const isjobapplicant = require('../../middleware/isjobapplicant');
const isrecruiter = require('../../middleware/isrecruiter');
const JobApplicantProfile = require('../../models/JobApplicantProfile');
const RecruiterProfile = require('../../models/RecruiterProfile');
const User = require('../../models/User');
const JobDetail = require('../../models/JobDetail');
const JobApplication = require('../../models/JobApplication');
const wordCount = require('word-count');

// route Post api/jobs/
// create a jobdetail private

router.post(
  '/',
  [
    auth,
    isrecruiter,
    [
      check('title', 'title is required').not().isEmpty(),
      check('typeofjob', 'typeofjob is required').not().isEmpty(),
      check('requiredskills', 'requiredskills is required').not().isEmpty(),
      check('maxapplications', 'maxapplications should be a number')
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
      check('maxpositions', 'maxpositions should be a number')
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
      check('duration', 'duration should be 0 to 6')
        .not()
        .isEmpty()
        .isInt({ gt: -1, lt: 6 }),
      check('salary', 'salary should be a number')
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
      check('deadline', 'deadline should be date').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      typeofjob,
      requiredskills,
      maxapplications,
      maxpositions,
      duration,
      salary,
      deadline,
    } = req.body;

    const jobs = {};
    jobs.user = req.user.id;
    if (title) {
      jobs.title = title;
    }
    if (typeofjob) {
      jobs.typeofjob = typeofjob;
    }
    if (requiredskills) {
      jobs.requiredskills = requiredskills
        .split(',')
        .map((skill) => skill.trim());
    }
    if (maxapplications) {
      jobs.maxapplications = maxapplications;
    }
    if (maxpositions) {
      jobs.maxpositions = maxpositions;
    }
    if (duration) {
      jobs.duration = duration;
    }
    if (salary) {
      jobs.salary = salary;
    }
    if (deadline) {
      jobs.deadline = deadline;
    }
    jobs.dateofposting = new Date();
    var deadlinenumber = new Date(deadline).getTime();
    var now = new Date(jobs.dateofposting).getTime();
    var dist = deadlinenumber - now;
    if (dist <= 0) {
      return res.status(400).json({ msg: 'Invalid Deadline' });
    }
    try {
      const jobdetails = new JobDetail(jobs);

      await jobdetails.save();
      res.json(jobdetails);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// route post /edit/:jobdetail_id
// edit jobdetails Private
router.post('/edit/:jobdetail_id', [auth, isrecruiter], async (req, res) => {
  const { maxapplications, maxpositions, deadline } = req.body;

  const jobs = {};
  //   jobs.user = req.user.id;

  if (maxapplications) {
    jobs.maxapplications = maxapplications;
  }
  if (maxpositions) {
    jobs.maxpositions = maxpositions;
  }

  if (deadline) {
    jobs.deadline = deadline;
  }

  try {
    let jobdetails = await JobDetail.findOne({
      _id: req.params.jobdetail_id,
    });

    if (jobdetails) {
      //update
      if (deadline) {
        var deadlinenumber = new Date(deadline).getTime();
        var now = new Date(jobdetails.dateofposting).getTime();
        var dist = deadlinenumber - now;
        if (dist <= 0) {
          return res.status(400).json({ msg: 'Invalid Deadline' });
        }
      }
      jobdetails = await JobDetail.findOneAndUpdate(
        { _id: req.params.jobdetail_id },
        { $set: jobs },
        { new: true }
      );
      return res.json(jobdetails);
    } else {
      return res.status(400).json({ msg: 'NO such job' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'NO such job' });
    }
    res.status(500).send('Server Error');
  }
});

// route get api/jobs/
// get all jobs private

router.get('/', auth, async (req, res) => {
  try {
    const jobsdetails = await JobDetail.find()
      .populate('user', ['name', 'email'])
      .sort({
        date: -1,
      });
    res.json(jobsdetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route get api/jobs/my
// get all recruiter jobs private

router.get('/my', [auth, isrecruiter], async (req, res) => {
  try {
    const jobsdetails = await JobDetail.find({ user: req.user.id })
      .populate('user', ['name', 'email'])
      .sort({
        date: -1,
      });
    res.json(jobsdetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//route get api/jobs/applicants/:jobdetail_id
//get all applicants of a job private
router.get(
  '/applicants/:jobdetail_id',
  [auth, isrecruiter],
  async (req, res) => {
    try {
      let jobs = await JobApplication.find({ job: req.params.jobdetail_id })
        .populate('applicant', ['name', 'email', 'noofratings', 'rating'])
        .populate('applicantprofile', ['skills', 'education'])
        .sort({
          date: -1,
        });
      res.json(jobs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//route put api/jobs/stage/:jobapplication_id
//changing the stage of that application private
router.put(
  '/stage/:jobapplication_id',
  [auth, isrecruiter, [check('stage', 'stage is required').not().isEmpty()]],
  async (req, res) => {
    const { stage } = req.body;
    const jobs = {};
    if (stage) {
      jobs.stage = stage;
    }
    try {
      const job = await JobApplication.findById({
        _id: req.params.jobapplication_id,
      });
      if (!job) {
        return res.status(400).json({ msg: 'No such job Application' });
      }
      let jobb = await JobApplication.findOneAndUpdate(
        { _id: req.params.jobapplication_id },
        { $set: jobs },
        { new: true }
      );
      //console.log(jobb);

      if (stage == 'Accepted') {
        await JobDetail.findOneAndUpdate(
          { _id: jobb.job },
          { $inc: { noofapplications: -1, noofpositions: 1 } },
          { new: true }
        );
        jobs.dateofjoining = new Date();
        await JobApplication.findOneAndUpdate(
          { _id: req.params.jobapplication_id },
          { $set: jobs },
          { new: true }
        );
        let upstage = JobApplication.find({ applicant: jobb.applicant });
        for (let i = 0; i < upstage.length; i++) {
          if (
            upstage[i].stage == 'Applied' ||
            upstage[i].stage == 'ShortListed'
          ) {
            await JobApplication.findOneAndUpdate(
              { _id: upstage[i]._id },
              { $set: { stage: 'Accepted for other' } },
              { new: true }
            );
          }
        }
      } else if (stage == 'Rejected') {
        await JobDetail.findOneAndUpdate(
          { _id: jobb.job },
          { $inc: { noofapplications: -1 } },
          { new: true }
        );
        await JobApplicantProfile.findOneAndUpdate(
          { _id: jobb.applicant },
          { $inc: { noofapplications: -1 } },
          { new: true }
        );
      }

      let applysjob = await JobApplication.find({ job: jobb.job })
        .populate('applicant', ['name', 'email', 'noofratings', 'rating'])
        .populate('applicantprofile', ['skills', 'education'])
        .sort({
          date: -1,
        });
      res.json(applysjob);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'No such jobApplication' });
      }
      res.status(500).send('Server Error');
    }
  }
);
// route post api/jobs/apply/:jobdetail_id
// apply jobs private
router.post(
  '/apply/:jobdetail_id',
  [auth, isjobapplicant, [check('sop', 'sop required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (req.body.sop) {
        if (wordCount(req.body.sop) > 250) {
          return res
            .status(400)
            .json({ msg: 'Sop should be less that 250 words' });
        }
      }
      const jobsdetails = await JobDetail.findOne({
        _id: req.params.jobdetail_id,
      });
      if (!jobsdetails) {
        return res.status(400).json({ msg: 'No such Job' });
      }
      if (jobsdetails.noofapplications == jobsdetails.maxapplications) {
        return res.status(400).json({ msg: 'max no of applications met' });
      }

      const profile = await JobApplicantProfile.findOne({ user: req.user.id });
      if (profile.noofapplications == 10) {
        return res
          .status(400)
          .json({ msg: 'You can apply for 10 open Applications only' });
      }
      await JobDetail.findOneAndUpdate(
        { _id: req.params.jobdetail_id },
        { $inc: { noofapplications: 1 } },
        { new: true }
      );

      const newjobapply = {
        recruiter: jobsdetails.user,
        applicant: req.user.id,
        job: jobsdetails.id,
        title: jobsdetails.title,
        salary: jobsdetails.salary,
        typeofjob: jobsdetails.typeofjob,
        rating: jobsdetails.rating,
        applicantprofile: profile._id,
        sop: req.body.sop,
      };

      const jobapply = new JobApplication(newjobapply);
      await jobapply.save();

      await JobApplicantProfile.findOneAndUpdate(
        { _id: req.user.id },
        { $inc: { noofapplications: 1 } },
        { new: true }
      );

      res.json(jobapply);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'NO such job' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// route delete api/jobs/:jobdetail_id
// delete job private
router.delete('/:jobdetail_id', [auth, isrecruiter], async (req, res) => {
  try {
    const jobsdetails = await JobDetail.findById(req.params.jobdetail_id);
    if (!jobsdetails) {
      return res.status(400).json({ msg: 'Job not found' });
    }
    if (jobsdetails.user.toString() != req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    const alljobapply = await JobApplication.find({ job: jobsdetails.id });
    // console.log(alljobapply);
    await JobApplication.updateMany(
      { job: req.params.jobdetail_id },
      { $set: { stage: 'Job Cancelled' } }
    );
    for (let i = 0; i < alljobapply.length; i++) {
      await JobApplicantProfile.findOneAndUpdate(
        { _id: alljobapply[i].applicantprofile },
        { $inc: { noofapplications: -1 } },
        { new: true }
      );
    }

    await jobsdetails.remove();
    res.json('Deleted succesfully');
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'NO such job found' });
    }
    res.status(500).send('Server Error');
  }
});

//route Get /api/jobs/getjob/:jobdetail_id
//get job by id
router.get('/getjob/:jobdetail_id', [auth, isrecruiter], async (req, res) => {
  try {
    const jobsdetails = await JobDetail.findById({
      _id: req.params.jobdetail_id,
    }).populate('user', ['name', 'email']);
    if (!jobsdetails) {
      return res.status(400).json({ errors: [{ msg: 'No Job Found' }] });
    }
    res.json(jobsdetails);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'NO such job found' });
    }
    res.status(500).send('Server Error');
  }
});

//Route GET /api/jobs/myapplications
//get all my applications
router.get('/myapplications', [auth, isjobapplicant], async (req, res) => {
  try {
    const jobs = await JobApplication.find({ applicant: req.user.id })
      .populate('recruiter', ['name', 'email'])
      .sort({
        date: -1,
      });

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Route Get /api/jobs/myemployees
//get all my employees
router.get('/myemployees', [auth, isrecruiter], async (req, res) => {
  try {
    const jobs = await JobApplication.find({ recruiter: req.user.id })
      .populate('applicant', ['name', 'email'])
      .sort({ date: -1 });
    const listemployees = jobs.filter((item) => item.stage === 'Accepted');
    res.json(listemployees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
