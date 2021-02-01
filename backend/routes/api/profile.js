const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const isjobapplicant = require('../../middleware/isjobapplicant');
//const isrecruiter = require('../../middleware/isrecruiter');
const JobApplicantProfile = require('../../models/JobApplicantProfile');
const RecruiterProfile = require('../../models/RecruiterProfile');
const User = require('../../models/User');
const wordCount = require('word-count');
// route Get api/profile/me
// gettig users profile , Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile =
      req.user.jobType == 'JobApplicant'
        ? await JobApplicantProfile.findOne({
            user: req.user.id,
          }).populate('user', ['name', 'email', 'jobType'])
        : await RecruiterProfile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'email', 'jobType']
          );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route post api/profile/
// create or update users profile , Private
router.post('/', auth, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  if (req.user.jobType == 'JobApplicant') {
    const { skills, phonenumber } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    if (phonenumber) {
      profileFields.phonenumber = phonenumber;
    }
    if (phonenumber) {
      if (phonenumber < 999999999 && phonenumber > 9999999999) {
        return res
          .status(400)
          .json({ msg: 'Please Enter A valid phone Number with 10-digits' });
      }
    }
    try {
      let profile = await JobApplicantProfile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await JobApplicantProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new JobApplicantProfile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    const { phonenumber, bio } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (phonenumber) {
      profileFields.phonenumber = phonenumber;
    }
    if (phonenumber) {
      if (phonenumber < 999999999 && phonenumber > 9999999999) {
        return res
          .status(400)
          .json({ msg: 'Please Enter A valid phone Number with 10-digits' });
      }
    }

    if (bio) {
      profileFields.bio = bio;
    }
    if (bio) {
      if (wordCount(bio) > 250) {
        return res
          .status(400)
          .json({ msg: 'Bio should be less than 250 words' });
      }
    }
    try {
      let profile = await RecruiterProfile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await RecruiterProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new RecruiterProfile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

// route get api/profile/user/:user_id
// get user profile by user id , Public
router.get('/user/:user_id', async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.user_id });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'No User Found' }] });
    }

    const profile =
      user.jobType == 'JobApplicant'
        ? await JobApplicantProfile.findOne({
            user: user.id,
          }).populate('user', ['name', 'email', 'jobType'])
        : await RecruiterProfile.findOne({ user: user.id }).populate('user', [
            'name',
            'email',
            'jobType',
          ]);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error');
  }
});

// route put api/profile/edu
// add profile edu, Private
router.put(
  '/edu',
  [
    auth,
    isjobapplicant,
    [
      check('school', 'school is required').not().isEmpty(),
      check('startYear', 'startyear should be a number').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, startYear, endYear } = req.body;
    if (endYear) {
      if (startYear > endYear) {
        return res
          .status(400)
          .json({ msg: 'StartYear Should be Less Than or Equal To EndYear' });
      }
    }
    const newedu = {
      school,
      startYear,
      endYear,
    };
    try {
      const profile = await JobApplicantProfile.findOne({ user: req.user.id });

      profile.education.unshift(newedu);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// route delete api/profile/edu/:edu_id
// delete profile edu , Private

router.delete('/edu/:edu_id', auth, async (req, res) => {
  try {
    const profile = await JobApplicantProfile.findOne({ user: req.user.id });

    // let removeIndex = -1;
    // profile.education.map((item) => {
    //   if (item.id == req.params.edu_id) {
    //     removeIndex = item.id;
    //   }
    // });
    // if (removeIndex == -1) {
    //   console.log(req.params.edu_id);
    //   return res.status(400).json({ msg: 'This education does not exists' });
    // }
    // console.log(removeIndex);
    // profile.education.splice(removeIndex, 1);

    const updatedprofile = await JobApplicantProfile.findByIdAndUpdate(
      { _id: profile.id },
      { $pull: { education: { _id: req.params.edu_id } } }
    );
    const upprofile = await JobApplicantProfile.findOne({ user: req.user.id });
    //console.log(upprofile);
    res.json(upprofile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
