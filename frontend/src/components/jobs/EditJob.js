import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getJobById, updateJob } from '../../actions/rjob';
import moment from 'moment';

const EditJob = ({
  updateJob,
  getJobById,
  rjobst: { rjob, loading },
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    maxapplications: '',
    maxpositions: '',
    deadline: '',
  });

  useEffect(() => {
    getJobById(match.params.id);
    setFormData({
      maxapplications:
        loading || !rjob.maxapplications ? '' : rjob.maxapplications,
      maxpositions: loading || !rjob.maxpositions ? '' : rjob.maxpositions,
      deadline: loading || !rjob.deadline ? '' : rjob.deadline,
    });
  }, [loading, getJobById]);
  const { maxapplications, maxpositions, deadline } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // (rjob._id);
    updateJob(formData, history, rjob._id);
  };

  return (
    <Fragment>
      <div>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
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

          <h2>Deadline</h2>
          <div className='form-group'>
            <input
              type='datetime-local'
              placeholder='* Deadline'
              name='deadline'
              value={moment(deadline).format().slice(0, 16)}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-primary' to={`/viewjob/${rjob._id}`}>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditJob.propTypes = {
  updateJob: PropTypes.func.isRequired,
  getJobById: PropTypes.func.isRequired,
  rjobst: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rjobst: state.rjob,
});
export default connect(mapStateToProps, {
  updateJob,
  getJobById,
})(withRouter(EditJob));
