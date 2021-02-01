import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { getAllJobs, getMyApplications } from '../../actions/rjob';
import { getCurrentProfile } from '../../actions/profile';
import Moment from 'react-moment';
import Fuse from 'fuse.js';

const AllJobs = ({
  getAllJobs,
  getMyApplications,
  getCurrentProfile,
  rjobst: { rjobs, loading, applicants },
}) => {
  const [formData, setFormData] = useState({
    actual: [],
  });
  const [searchData, setSearchData] = useState({
    search: '',
    sort: '',
    filterType: '',
    filterDuration: '',
    minsalary: '',
    maxsalary: '',
  });
  useEffect(() => {
    getAllJobs();
    getMyApplications();
    getCurrentProfile();
    setFormData({
      actual: loading || rjobs.length === 0 ? [] : rjobs,
    });
  }, [getAllJobs, getMyApplications, getCurrentProfile, loading]);

  // console.log(rjobs);

  const { actual } = formData;
  const {
    search,
    sort,
    filterType,
    filterDuration,
    minsalary,
    maxsalary,
  } = searchData;
  const countdown = (date) => {
    var countDownDate = new Date(date).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
  };

  const check = (id) => {
    if (applicants.length > 0) {
      var x = applicants.filter((app) => app.job === id);

      if (Object.keys(x).length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const checkdeadline = (date) => {
    var countDownDate = new Date(date).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    if (distance <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const isAccepted = () => {
    if (applicants.length > 0) {
      var x = applicants.filter((item) => item.stage === 'Accepted');
      if (Object.keys(x).length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const checkzero = (x) => {
    if (x == 0) {
      return false;
    } else {
      return true;
    }
  };
  const options = {
    isCaseSensitive: false,
    keys: ['title'],
  };
  const onChangeSearch = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    let fuse;
    if (actual.length == 0) {
      fuse = new Fuse(rjobs, options);
    } else {
      fuse = new Fuse(actual, options);
    }
    var virtualwi = fuse.search(e.target.value);
    var virtual = actual;
    if (actual.length == 0) {
      virtual = rjobs;
    }

    if (virtualwi.length !== 0) {
      virtual = virtualwi.map((kl) => {
        return kl.item;
      });
    } else {
      virtual = actual;
      if (actual.length == 0) {
        virtual = rjobs;
      }
    }
    setFormData({ ...formData, actual: virtual });
  };

  const onChangeSort = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    var virtual = actual;
    if (actual.length == 0) {
      if (e.target.value === 'SortSalaryAsc') {
        virtual = rjobs.sort((a, b) => a.salary - b.salary);
      } else if (e.target.value === 'SortSalaryDesc') {
        virtual = rjobs.sort((a, b) => b.salary - a.salary);
      } else if (e.target.value === 'SortDurationAsc') {
        virtual = rjobs.sort((a, b) => a.duration - b.duration);
      } else if (e.target.value === 'SortDurationDesc') {
        virtual = rjobs.sort((a, b) => b.duration - a.duration);
      } else if (e.target.value === 'SortRatingAsc') {
        virtual = rjobs.sort((a, b) => a.rating - b.rating);
      } else if (e.target.value === 'SortRatingDesc') {
        virtual = rjobs.sort((a, b) => b.rating - a.rating);
      } else {
        virtual = rjobs;
      }
    } else {
      if (e.target.value === 'SortSalaryAsc') {
        virtual = actual.sort((a, b) => a.salary - b.salary);
      } else if (e.target.value === 'SortSalaryDesc') {
        virtual = actual.sort((a, b) => b.salary - a.salary);
      } else if (e.target.value === 'SortDurationAsc') {
        virtual = actual.sort((a, b) => a.duration - b.duration);
      } else if (e.target.value === 'SortDurationDesc') {
        virtual = actual.sort((a, b) => b.duration - a.duration);
      } else if (e.target.value === 'SortRatingAsc') {
        virtual = actual.sort((a, b) => a.rating - b.rating);
      } else if (e.target.value === 'SortRatingDesc') {
        virtual = actual.sort((a, b) => b.rating - a.rating);
      } else {
        virtual = actual;
      }
    }
    // console.log(virtual);
    setFormData({ ...formData, actual: virtual });
  };

  const onChangefilterType = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    var virtual = actual;

    if (e.target.value === 'Full-time') {
      virtual = rjobs.filter((a) => a.typeofjob === 'Full-time');
    } else if (e.target.value === 'Part-time') {
      virtual = rjobs.filter((a) => a.typeofjob === 'Part-time');
    } else if (e.target.value === 'Work From Home') {
      virtual = rjobs.filter((a) => a.typeofjob === 'Work From Home');
    } else {
      virtual = rjobs;
    }

    // console.log(virtual);
    setFormData({ ...formData, actual: virtual });
  };

  const onChangefilterDuration = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    var virtual = actual;
    if (e.target.value !== 0) {
      virtual = rjobs.filter((a) => a.duration < e.target.value);
    } else {
      virtual = rjobs;
    }

    // console.log(virtual);

    setFormData({ ...formData, actual: virtual });
  };
  var crossing = [];
  const onChangeMinSalary = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    var virtual = actual;
    if (e.target.value >= 0) {
      virtual = rjobs.filter((a) => a.salary > e.target.value);
    } else {
      virtual = rjobs;
    }
    crossing = virtual;
    //console.log(crossing);

    setFormData({ ...formData, actual: virtual });
  };

  const onChangeMaxSalary = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    var virtual = rjobs;
    if (e.target.value !== 0) {
      virtual = rjobs.filter(
        (a) => a.salary < e.target.value && a.salary > minsalary
      );
    } else {
      virtual = rjobs;
    }

    if (virtual.length == 0) {
      virtual = rjobs;
    }
    //console.log(virtual);

    setFormData({ ...formData, actual: virtual });
  };

  return (
    <Fragment>
      {loading ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <form className='myform'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Search'
                name='search'
                value={search}
                onChange={(e) => onChangeSearch(e)}
              />
            </div>
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
                <option value='SortSalaryAsc'>Sort Salary in Asc</option>
                <option value='SortSalaryDesc'>Sort Salary in Desc</option>
                <option value='SortDurationAsc'>Sort Duration in Asc</option>
                <option value='SortDurationDesc'>Sort Duration in Desc</option>
                <option value='SortRatingAsc'>Sort Rating in Asc</option>
                <option value='SortRatingDesc'>Sort Rating in Desc</option>
              </select>
            </div>
            <div className='form-group'>
              <h2>Filter by TypeofJob:</h2>
              <select
                type='text'
                name='filterType'
                className='dropdown'
                value={filterType}
                onChange={(e) => onChangefilterType(e)}
              >
                <option value='Normal' defaultValue>
                  Normal
                </option>
                <option value='Full-time'>Full Time</option>
                <option value='Part-time'>Part Time</option>
                <option value='Work From Home'>Work From Home</option>
              </select>
            </div>
            <div className='form-group'>
              <h2>Filter by Duration:</h2>
              <select
                type='Number'
                name='filterDuration'
                className='dropdown'
                value={filterDuration}
                onChange={(e) => onChangefilterDuration(e)}
              >
                <option value='0' defaultValue>
                  Normal
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
              </select>
            </div>
            <div className='form-group'>
              <input
                type='Number'
                placeholder='Min salary'
                name='minsalary'
                value={minsalary}
                onChange={(e) => onChangeMinSalary(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='Number'
                placeholder='Max salary'
                name='maxsalary'
                value={maxsalary}
                onChange={(e) => onChangeMaxSalary(e)}
              />
            </div>
          </form>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Recruiter </th>
                <th>Salary</th>
                <th>Rating</th>
                <th>Duration</th>
                <th>Date of Posting</th>
                <th>Deadline</th>
                <th>Required Skills</th>
                <th>Type of Job</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {checkzero(actual.length)
                ? actual
                    .filter((item) => checkdeadline(item.deadline))
                    .map((edu) => (
                      <tr key={edu._id}>
                        <td>{edu.title}</td>
                        <td>{edu.user.name}</td>
                        <td>{edu.salary}</td>
                        <td>{edu.rating / edu.noofratings}</td>
                        <td>{edu.duration}</td>
                        <td>
                          <Moment format='DD/MM/YYYY'>
                            {edu.dateofposting}
                          </Moment>
                        </td>
                        <td>{countdown(edu.deadline)}</td>
                        <td>{edu.requiredskills.join(',')}</td>
                        <td>{edu.typeofjob}</td>
                        <Fragment>
                          <td>
                            {isAccepted() ? (
                              <Fragment>
                                <p className='btn btn-light'>Can't Apply</p>
                              </Fragment>
                            ) : (
                              <Fragment>
                                {edu.maxapplications !== edu.noofapplications ||
                                edu.maxpositions !== edu.noofpositions ? (
                                  <Fragment>
                                    {check(edu._id) ? (
                                      <Fragment>
                                        <Link
                                          to={`/applyjob/${edu._id}`}
                                          className='btn btn-primary'
                                        >
                                          Apply
                                        </Link>{' '}
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        <p className='btn btn-success'>
                                          Applied
                                        </p>
                                      </Fragment>
                                    )}
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <p className='btn btn-light'>FULL</p>
                                  </Fragment>
                                )}
                              </Fragment>
                            )}
                          </td>
                        </Fragment>
                      </tr>
                    ))
                : rjobs
                    .filter((item) => checkdeadline(item.deadline))
                    .map((edu) => (
                      <tr key={edu._id}>
                        <td>{edu.title}</td>
                        <td>{edu.user.name}</td>
                        <td>{edu.salary}</td>
                        <td>{edu.rating / edu.noofratings}</td>
                        <td>{edu.duration}</td>
                        <td>
                          <Moment format='DD/MM/YYYY'>
                            {edu.dateofposting}
                          </Moment>
                        </td>
                        <td>{countdown(edu.deadline)}</td>
                        <td>{edu.requiredskills.join(',')}</td>
                        <td>{edu.typeofjob}</td>
                        <Fragment>
                          <td>
                            {isAccepted() ? (
                              <Fragment>
                                <p className='btn btn-light'>Can't Apply</p>
                              </Fragment>
                            ) : (
                              <Fragment>
                                {edu.maxapplications !== edu.noofapplications ||
                                edu.maxpositions !== edu.noofpositions ? (
                                  <Fragment>
                                    {check(edu._id) ? (
                                      <Fragment>
                                        <Link
                                          to={`/applyjob/${edu._id}`}
                                          className='btn btn-primary'
                                        >
                                          Apply
                                        </Link>{' '}
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        <p className='btn btn-success'>
                                          Applied
                                        </p>
                                      </Fragment>
                                    )}
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <p className='btn btn-light'>FULL</p>
                                  </Fragment>
                                )}
                              </Fragment>
                            )}
                          </td>
                        </Fragment>
                      </tr>
                    ))}
            </tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

AllJobs.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  getMyApplications: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  rjobst: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  rjobst: state.rjob,
});

export default connect(mapStateToProps, {
  getAllJobs,
  getMyApplications,
  getCurrentProfile,
})(AllJobs);
