import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getJobById, getMyApplicants } from '../../actions/rjob';
import Applicants from './Applicants';

const ViewJob = ({
  getJobById,
  getMyApplicants,
  rjobst: { rjob, loading },
  match,
}) => {
  useEffect(() => {
    getJobById(match.params.id);
    getMyApplicants(match.params.id);
  }, [getJobById, getMyApplicants]);
  const [disableshow, toggledisableshow] = useState(false);
  return (
    <Fragment>
      {loading || rjob === null ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <Link className='btn btn-primary' to={`/editjob/${rjob._id}`}>
            <i className='fa fa-pencil-square'></i> Edit Job
          </Link>
          <Link className='btn btn-primary' to='/dashboard'>
            Go Back
          </Link>
          <br />
          <br />
          <div>
            <table>
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>{rjob.title}</td>
                </tr>
                <tr>
                  <td> Type of Job </td>
                  <td>{rjob.typeofjob}</td>
                </tr>
                <tr>
                  <td> Required Skills</td>
                  <td>{rjob.requiredskills.join(',')}</td>
                </tr>
                <tr>
                  <td>Date of Posting</td>
                  <td>
                    <Moment format='DD/MM/YYYY'>{rjob.dateofposting}</Moment>
                  </td>
                </tr>
                <tr>
                  <td> No of Applications </td>
                  <td>{rjob.noofapplications}</td>
                </tr>
                <tr>
                  <td> No of positions </td>
                  <td>{rjob.noofpositions}</td>
                </tr>
                <tr>
                  <td> Max no of Applications </td>
                  <td>{rjob.maxapplications}</td>
                </tr>
                <tr>
                  <td>Max no of Positions </td>
                  <td>{rjob.maxpositions}</td>
                </tr>
                <tr>
                  <td> Duration </td>
                  <td>{rjob.duration} months</td>
                </tr>
                <tr>
                  <td> Salary </td>
                  <td>Rs. {rjob.salary} </td>
                </tr>
                <tr>
                  <td> Deadline </td>
                  <td>{moment(rjob.deadline).format('LLL')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <div className='my-2'>
            <button
              onClick={() => toggledisableshow(!disableshow)}
              type='button'
              className='btn btn-primary'
            >
              Show Applicants
            </button>
          </div>
          {disableshow && (
            <Fragment>
              <Applicants />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ViewJob.propTypes = {
  getJobById: PropTypes.func.isRequired,
  rjobst: PropTypes.object.isRequired,
  getMyApplicants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rjobst: state.rjob,
});
export default connect(mapStateToProps, { getJobById, getMyApplicants })(
  ViewJob
);
