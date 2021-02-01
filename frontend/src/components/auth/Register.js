import React, { Fragment, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profile';
const Register = ({
  setAlert,
  register,
  isAuthenticated,
  createProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobType: '',
    password: '',
    password2: '',
  });

  const { name, email, jobType, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords doesnt match', 'danger');
    } else {
      register({ name, email, password, jobType });
    }
  };

  if (isAuthenticated) {
    createProfile(formData, history, false, true, false);
    if (jobType === 'JobApplicant') {
      return <Redirect to='/createapplicantprofile' />;
    } else {
      return <Redirect to='/createrecruiterprofile' />;
    }
  }

  return (
    <Fragment>
      {' '}
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>Create Your Account</p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <select
              type='text'
              name='jobType'
              className='dropdown'
              value={jobType}
              onChange={(e) => onChange(e)}
            >
              <option value='' defaultValue disabled>
                * choose a Job Type
              </option>
              <option value='JobApplicant'>JobApplicant</option>
              <option value='Recruiter'>Recruiter</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='* Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='* Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='* Confirm Password'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, createProfile })(
  withRouter(Register)
);
