import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Edu from './Edu';

const ReviewEdu = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Fragment>
      {loading && profile === null ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <Edu educ={profile.education} del={true} />
        </Fragment>
      )}
      <Link className='btn btn-primary my-1' to='/editapplicantprofile'>
        Go Back
      </Link>
    </Fragment>
  );
};

ReviewEdu.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(ReviewEdu);
