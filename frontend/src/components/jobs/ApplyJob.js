import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { applyJob } from '../../actions/rjob';

const ApplyJob = ({ applyJob, history, match }) => {
  const [formData, setFormData] = useState({
    sop: '',
  });
  const { sop } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    applyJob(formData, history, match.params.id);
  };
  return (
    <Fragment>
      <div>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>Submit SOP to apply for this job</p>
          <h2>SOP</h2>
          <div className='form-group'>
            <textarea
              placeholder='* Statement of Purpose'
              name='sop'
              cols='25'
              rows='15'
              value={sop}
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

ApplyJob.propTypes = {
  applyJob: PropTypes.func.isRequired,
};

export default connect(null, { applyJob })(withRouter(ApplyJob));
