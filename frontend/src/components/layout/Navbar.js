import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fa fa-address-book'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      {user && (
        <Fragment>
          {user.jobType === 'JobApplicant' ? (
            <Fragment>
              <li>
                <Link to='/myapplications'>
                  <i className='fa fa-male'></i>{' '}
                  <span className='hide-sm'>My Applications</span>
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to='/myemployees'>
                  <i className='fa fa-male'></i>{' '}
                  <span className='hide-sm'>My Employees</span>
                </Link>
              </li>
            </Fragment>
          )}
        </Fragment>
      )}
      <li>
        <Link to='/myprofile'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>My Profile</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i>
          {''}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>
          <i className='fas fa-user-plus'></i> Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt'></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fa fa-linkedin-square'></i> Job Portal
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
