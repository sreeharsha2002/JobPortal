import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateRecruiterProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    phonenumber: '',
    bio: '',
  });

  const { phonenumber, bio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true, false);
  };

  return (
    <Fragment>
      <p className='lead'> Would u like to add your Bio</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='Number'
            placeholder='Phone Number'
            name='phonenumber'
            value={phonenumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
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
        <Link className='btn btn-primary my-1' to='/dashboard'>
          Go To Dashboard
        </Link>
      </form>
    </Fragment>
  );
};

CreateRecruiterProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(
  withRouter(CreateRecruiterProfile)
);
