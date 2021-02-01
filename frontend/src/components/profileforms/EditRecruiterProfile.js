import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditRecruiterProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    phonenumber: '',
    bio: '',
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      phonenumber: loading || !profile.phonenumber ? '' : profile.phonenumber,
      bio: loading || !profile.bio ? '' : profile.bio,
    });
  }, [loading, getCurrentProfile]);

  const { phonenumber, bio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true, false);
  };

  return (
    <Fragment>
      <h1 className='x-large'>Edit Profile</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <h1>Phone Number:</h1>
          <input
            type='Number'
            placeholder='Phone Number'
            name='phonenumber'
            value={phonenumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h1>Bio:</h1>
          <textarea
            placeholder='Bio of yourself'
            name='bio'
            cols='25'
            rows='5'
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-primary my-1' to='/myprofile'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditRecruiterProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditRecruiterProfile)
);
