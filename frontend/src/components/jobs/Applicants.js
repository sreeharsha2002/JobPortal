import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { getMyApplicants, changeApplicantStage } from '../../actions/rjob';

const Applicants = ({
  getMyApplicants,
  changeApplicantStage,
  rjobst: { rjob, applicants, loading },
}) => {
  const [formData, setFormData] = useState({
    actual: [],
  });
  const [searchData, setSearchData] = useState({
    sort: '',
  });
  useEffect(() => {
    getMyApplicants(rjob._id);
    setFormData({
      actual: loading || applicants.length === 0 ? [] : applicants,
    });
  }, [getMyApplicants, loading]);

  const onClick = (ststage, id) => {
    changeApplicantStage(ststage, id);
  };

  const { actual } = formData;
  const { sort } = searchData;

  const countdown = (date) => {
    var countDownDate = new Date(date).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    return distance;
  };

  const onChangeSort = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    var virtual = applicants;

    if (e.target.value === 'SortNameAsc') {
      virtual = applicants.sort((a, b) =>
        a.applicant.name.localcompare(b.applicant.name)
      );
    } else if (e.target.value === 'SortNameDesc') {
      virtual = applicants.sort((a, b) =>
        b.applicant.name.localcompare(a.applicant.name)
      );
    } else if (e.target.value === 'SortDateAsc') {
      virtual = applicants.sort(
        (a, b) =>
          countdown(a.dateofapplication) - countdown(b.dateofapplication)
      );
    } else if (e.target.value === 'SortDateDesc') {
      virtual = applicants.sort(
        (a, b) =>
          countdown(b.dateofapplication) - countdown(a.dateofapplication)
      );
    } else if (e.target.value === 'SortRatingAsc') {
      virtual = applicants.sort((a, b) => a.rating - b.rating);
    } else if (e.target.value === 'SortRatingDesc') {
      virtual = applicants.sort((a, b) => b.rating - a.rating);
    } else {
      virtual = applicants;
    }

    // console.log(virtual);
    setFormData({ ...formData, actual: virtual });
  };

  const edcus = applicants
    .filter(
      (item) =>
        item.stage !== 'Accepted' &&
        item.stage !== 'Rejected' &&
        item.stage !== 'Accepted for other'
    )
    .map((edu) => (
      <tr key={edu._id}>
        <td>{edu.applicant.name}</td>
        <td>{edu.applicantprofile.skills.join(',')}</td>
        <td>
          <Moment format='DD/MM/YYYY'>{edu.dateofapplication}</Moment>
        </td>
        <td>
          <ul>
            {edu.applicantprofile.education.map((educinst) => (
              <li key={educinst._id}>
                <h2>Education</h2>
                <p>School:{educinst.school}</p>
                <p>StartYear:{educinst.startYear}</p>
                <p>
                  EndYear:{educinst.endYear != null ? educinst.endYear : ' '}
                </p>
              </li>
            ))}
          </ul>
        </td>
        <td>{edu.sop}</td>
        <td>{edu.applicant.rating / edu.applicant.noofratings}</td>
        <td>
          {edu.stage === 'ShortListed' ? (
            <button
              onClick={() => onClick('Accepted', edu._id)}
              className='btn btn-success'
            >
              Accept
            </button>
          ) : (
            <button
              onClick={() => onClick('ShortListed', edu._id)}
              className='btn btn-primary'
            >
              ShortList
            </button>
          )}
          <button
            onClick={() => onClick('Rejected', edu._id)}
            className='btn btn-danger'
          >
            Reject
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      {loading ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <form className='myform'>
            <div className='form-group'>
              <h2>Sort:</h2>
              <select
                type='text'
                name='sort'
                className='dropdown'
                value={sort}
                onChange={(e) => onChangeSort(e)}
              >
                <option value='Normal' defaultValue>
                  Normal
                </option>
                <option value='SortNameAsc'>Sort Name in Asc</option>
                <option value='SortNameDesc'>Sort Name in Desc</option>
                <option value='SortDateAsc'>Sort Date in Asc</option>
                <option value='SortDateDesc'>Sort Date in Desc</option>
                <option value='SortRatingAsc'>Sort Rating in Asc</option>
                <option value='SortRatingDesc'>Sort Rating in Desc</option>
              </select>
            </div>
          </form>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Skills </th>
                <th>Date of Application</th>
                <th>Education</th>
                <th>SOP</th>
                <th>Rating</th>
                <th>Stage of Application</th>
              </tr>
            </thead>
            <tbody>{edcus}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

Applicants.propTypes = {
  getMyApplicants: PropTypes.func.isRequired,
  changeApplicantStage: PropTypes.func.isRequired,
  rjobst: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  rjobst: state.rjob,
});

export default connect(mapStateToProps, {
  getMyApplicants,
  changeApplicantStage,
})(Applicants);
