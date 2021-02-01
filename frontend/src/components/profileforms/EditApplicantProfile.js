import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
// import Edu from './Edu';

const EditApplicantProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    phonenumber: '',
    skills: '',
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      phonenumber: loading || !profile.phonenumber ? '' : profile.phonenumber,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
    });
  }, [loading, getCurrentProfile]);

  const { phonenumber, skills } = formData;
  //console.log(edu);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    //console.log(Object.keys(error).length);
    //console.log('updating');
    createProfile(formData, history, true, false);
  };

  return (
    <Fragment>
      {loading ? (
        <Fragment>Loading..</Fragment>
      ) : (
        <Fragment>
          <h1 className='x-large'>Edit Profile</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <h1>Phone Number:</h1>
              <input
                type='Number'
                placeholder='Phonenumber'
                name='phonenumber'
                value={phonenumber}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h1>Skills:</h1>
              <input
                type='text'
                placeholder='Skills'
                name='skills'
                value={skills}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <input type='submit' className='btn btn-primary my-1' />
          </form>
          <Link className='btn btn-primary my-1' to='/reviewedu'>
            Review and delete Education
          </Link>
          {'   '}
          <Link className='btn btn-primary my-1' to='/addedu'>
            Add Education
          </Link>{' '}
          <Link className='btn btn-primary my-1' to='/myprofile'>
            Go Back
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

EditApplicantProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
})(withRouter(EditApplicantProfile));
