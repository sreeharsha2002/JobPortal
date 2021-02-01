import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateApplicantProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    phonenumber: '',
    skills: '',
  });

  const { phonenumber, skills } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true, false);
  };

  return (
    <Fragment>
      <p className='lead'> Would u like to add your Skills</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='Number'
            placeholder='Phonenumber'
            name='phonenumber'
            value={phonenumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
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
        <Link className='btn btn-primary my-1' to='/dashboard'>
          Go To Dashboard
        </Link>
      </form>
    </Fragment>
  );
};

CreateApplicantProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(
  withRouter(CreateApplicantProfile)
);
