import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { getAllMyJobs, delJobById } from '../../actions/rjob';

const AllMyJobs = ({
  getAllMyJobs,
  delJobById,
  rjobst: { rjobs, loading },
}) => {
  useEffect(() => {
    getAllMyJobs();
  }, [getAllMyJobs]);

  const edcus = rjobs
    .filter((item) => item.maxpositions !== item.noofpositions)
    .map((edu) => (
      <tr key={edu._id}>
        <td>{edu.title}</td>
        <td>
          <Moment format='DD/MM/YYYY'>{edu.dateofposting}</Moment>
        </td>
        <td>{edu.noofapplications}</td>
        <td>{edu.maxpositions - edu.noofpositions}</td>
        <Fragment>
          <td>
            <Link to={`/viewjob/${edu._id}`} className='btn btn-primary'>
              View
            </Link>{' '}
            <button
              onClick={() => delJobById(edu._id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </td>
        </Fragment>
      </tr>
    ));

  return (
    <Fragment>
      {loading ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date of posting </th>
                <th>Number of Applicants</th>
                <th>Remaining Positions</th>
                <th />
              </tr>
            </thead>
            <tbody>{edcus}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

AllMyJobs.propTypes = {
  getAllMyJobs: PropTypes.func.isRequired,
  delJobById: PropTypes.func.isRequired,
  rjobst: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rjobst: state.rjob,
});

export default connect(mapStateToProps, { getAllMyJobs, delJobById })(
  AllMyJobs
);
