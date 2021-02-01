import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyApplications } from '../../actions/rjob';
import Moment from 'react-moment';

const MyApplications = ({
  getMyApplications,
  rjobst: { loading, applicants },
}) => {
  useEffect(() => {
    getMyApplications();
  }, [getMyApplications]);
  const edcus = applicants.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.title}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{edu.dateofjoining}</Moment>
      </td>
      <td>{edu.salary}</td>
      <td>{edu.recruiter.name}</td>
      <td>{edu.typeofjob}</td>
      <td>{edu.stage}</td>
      <td>
        {edu.isjobrated ? (
          <Fragment>Already Rated</Fragment>
        ) : (
          <Fragment>
            <form>
              <div className='form-group'>
                <select
                  type='text'
                  name='jobType'
                  className='dropdown'
                  value={edu.rating}
                  readOnly
                >
                  <option value='' defaultValue disabled>
                    * choose a Rating
                  </option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </form>
          </Fragment>
        )}
      </td>
    </tr>
  ));
  return (
    <Fragment>
      {loading ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <Link className='btn btn-primary' to='/dashboard'>
            Go Back
          </Link>
          <h1 className='x-large'>My Applications</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date of Joining </th>
                <th>Salary</th>
                <th>Recruiter</th>
                <th>Type of Job</th>
                <th>Stage of Application</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>{edcus}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

MyApplications.propTypes = {
  getMyApplications: PropTypes.func.isRequired,
  rjobst: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  rjobst: state.rjob,
});

export default connect(mapStateToProps, { getMyApplications })(MyApplications);
