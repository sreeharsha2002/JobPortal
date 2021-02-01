import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AllMyJobs from '../jobs/AllMyJobs';
import AllJobs from '../jobs/AllJobs';
import { Link } from 'react-router-dom';
//import { getCurrentProfile } from '../../actions/profile';
//import { Link } from 'react-router-dom';

const Dashboard = ({ auth: { user, loading } }) => {
  return (
    <Fragment>
      {loading ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <h1 className='large'>Dashboard</h1>
          <p className='lead text-dark'>
            <strong>Welcome {user && user.name}</strong>
          </p>
          {user && (
            <Fragment>
              {user.jobType === 'JobApplicant' ? (
                <Fragment>
                  <AllJobs />
                </Fragment>
              ) : (
                <Fragment>
                  <Link className='btn btn-primary' to='/createjob'>
                    <i className='fas fa-plus-square'></i> Create Job
                  </Link>
                  <br />
                  <br />
                  <AllMyJobs />
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);
