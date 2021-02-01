import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEdu } from '../../actions/profile';

const Edu = ({ educ, deleteEdu, del }) => {
  const edcus = educ.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.startYear}</td>
      <td>{edu.endYear}</td>
      {del && (
        <Fragment>
          <td>
            <button
              onClick={() => deleteEdu(edu._id)}
              className='btn btn-danger'
            >
              Delete
            </button>{' '}
          </td>
        </Fragment>
      )}
    </tr>
  ));
  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Institute</th>
            <th>StartYear</th>
            <th>EndYear</th>
          </tr>
        </thead>
        <tbody>{edcus}</tbody>
      </table>
    </Fragment>
  );
};

Edu.propTypes = {
  educ: PropTypes.array.isRequired,
  deleteEdu: PropTypes.func.isRequired,
};

export default connect(null, { deleteEdu })(Edu);
