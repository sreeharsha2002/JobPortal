import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Edu from './Edu';

const MyProfile = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Fragment>
      {loading || profile === null ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          {profile.user.jobType === 'JobApplicant' ? (
            <Fragment>
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
                      <td>Name</td>
                      <td>{profile.user.name}</td>
                    </tr>
                    <tr>
                      <td>Email Id</td>
                      <td>{profile.user.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>{profile.phonenumber}</td>
                    </tr>
                    <tr>
                      <td>Skills</td>
                      <td>{profile.skills.join(',')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Fragment>
          ) : (
            <Fragment>
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
                      <td>Name</td>
                      <td>{profile.user.name}</td>
                    </tr>
                    <tr>
                      <td>Email Id</td>
                      <td>{profile.user.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>{profile.phonenumber}</td>
                    </tr>
                    <tr>
                      <td>Bio</td>
                      <td>{profile.bio}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Fragment>
          )}
          {profile.user.jobType === 'JobApplicant' && (
            <Fragment>
              <Edu educ={profile.education} del={false} />
            </Fragment>
          )}
          {profile.user.jobType === 'JobApplicant' ? (
            <Fragment>
              <Link className='btn btn-primary my-1' to='/editapplicantprofile'>
                Edit profile
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link className='btn btn-primary my-1' to='/editrecruiterprofile'>
                Edit Profile
              </Link>
            </Fragment>
          )}

          <Link className='btn btn-primary my-1' to='/dashboard'>
            Go To Dashboard
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

MyProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
})(withRouter(MyProfile));
