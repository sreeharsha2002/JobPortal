import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createJob } from '../../actions/rjob';

const CreateJob = ({ createJob, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    typeofjob: '',
    requiredskills: '',
    maxapplications: '',
    maxpositions: '',
    duration: '',
    salary: '',
    deadline: '',
  });
  const {
    title,
    typeofjob,
    requiredskills,
    maxapplications,
    maxpositions,
    duration,
    salary,
    deadline,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createJob(formData, history);
  };

  return (
    <Fragment>
      <div>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <h2>Title</h2>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Title'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <h2>Type of Job</h2>
          <div className='form-group'>
            <select
              type='text'
              name='typeofjob'
              className='dropdown'
              value={typeofjob}
              onChange={(e) => onChange(e)}
            >
              <option value='' defaultValue disabled>
                * choose a Type of Job
              </option>
              <option value='Full-time'>Full-time</option>
              <option value='Part-time'>Part-time</option>
              <option value='Work From Home'>Work From Home</option>
            </select>
          </div>
          <h2>Required Skills</h2>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Required Skills'
              name='requiredskills'
              value={requiredskills}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <h2>Max no of Applications</h2>
          <div className='form-group'>
            <input
              type='Number'
              placeholder='* Maximum no of Applications'
              name='maxapplications'
              value={maxapplications}
              onChange={(e) => onChange(e)}
            />
          </div>
          <h2>Max no of Positions</h2>
          <div className='form-group'>
            <input
              type='Number'
              placeholder='* Maximum no of Positions'
              name='maxpositions'
              value={maxpositions}
              onChange={(e) => onChange(e)}
            />
          </div>
          <h2>Duration</h2>
          <div className='form-group'>
            <input
              type='Number'
              placeholder='* Duration'
              name='duration'
              value={duration}
              onChange={(e) => onChange(e)}
            />
          </div>
          <h2>Salary</h2>
          <div className='form-group'>
            <input
              type='Number'
              placeholder='* Salary'
              name='salary'
              value={salary}
              onChange={(e) => onChange(e)}
            />
          </div>
          <h2>Deadline</h2>
          <div className='form-group'>
            <input
              type='datetime-local'
              placeholder='* Deadline'
              name='deadline'
              value={deadline}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-primary' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateJob.propTypes = {
  createJob: PropTypes.func.isRequired,
};

export default connect(null, { createJob })(withRouter(CreateJob));
