import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEdu } from '../../actions/profile';

const AddEdu = ({ addEdu, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    startYear: '',
    endYear: '',
  });
  const { school, startYear, endYear } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(123);
    addEdu(formData, history);
  };
  return (
    <Fragment>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <small>*=required field to add an education</small>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='Number'
            placeholder='* StartYear'
            name='startYear'
            min='1900'
            max='2100'
            value={startYear}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='Number'
            placeholder='EndYear'
            name='endYear'
            min='1900'
            max='2100'
            value={endYear}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-primary my-1' to='/editapplicantprofile'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEdu.propTypes = {
  addEdu: PropTypes.func.isRequired,
};

export default connect(null, { addEdu })(withRouter(AddEdu));
