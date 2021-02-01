import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_RJOBS,
  RJOB_ERROR,
  CREATE_JOB,
  DELETE_JOB,
  SET_RJOB,
  RESET_RJOB,
  ADD_APPLY,
  GET_APPLYS,
  RESET_APPLYS,
} from './types';

// get all my jobs
export const getAllMyJobs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/jobs/my');
    dispatch({
      type: GET_RJOBS,
      payload: res.data,
    });
    dispatch({
      type: RESET_APPLYS,
    });
  } catch (err) {
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create job
export const createJob = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/jobs', formData, config);
    dispatch({
      type: CREATE_JOB,
      payload: res.data,
    });
    dispatch(setAlert('Job Created', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//UPDATE JOB
export const updateJob = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/jobs/edit/${id}`, formData, config);
    dispatch({
      type: SET_RJOB,
      payload: res.data,
    });
    dispatch(setAlert('Job Updated', 'success'));
    history.push(`/viewjob/${id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RESET_RJOB,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get job by id
export const getJobById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/jobs/getjob/${id}`);
    //console.log(res.data);
    dispatch({
      type: SET_RJOB,
      payload: res.data,
    });
  } catch (err) {
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    dispatch({
      type: RESET_RJOB,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete job
export const delJobById = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure do delete? This will reject all applications and employees ot this job'
    )
  ) {
    try {
      await axios.delete(`/api/jobs/${id}`);
      //console.log(res.data);
      dispatch({
        type: DELETE_JOB,
        payload: id,
      });
      dispatch(setAlert('Deleted Job Succesfully', 'success'));
    } catch (err) {
      const inerror = err.response.data;
      if (inerror) {
        dispatch(setAlert(inerror.msg, 'danger'));
      }
      dispatch({
        type: RJOB_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//get all jobs
// get all my jobs
export const getAllJobs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/jobs/');
    dispatch({
      type: GET_RJOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get my applications
export const getMyApplications = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/jobs/myapplications');
    dispatch({
      type: GET_APPLYS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//apply for a job
export const applyJob = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/jobs/apply/${id}`, formData, config);
    dispatch({
      type: ADD_APPLY,
      payload: res.data,
    });
    dispatch(setAlert('Applied Successfully', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get my applicants
export const getMyApplicants = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/jobs/applicants/${id}`);
    dispatch({
      type: GET_APPLYS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//changing applicant stage
export const changeApplicantStage = (stage, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const formData = JSON.stringify({ stage });
    const res = await axios.put(`/api/jobs/stage/${id}`, formData, config);
    dispatch({
      type: GET_APPLYS,
      payload: res.data,
    });
  } catch (err) {
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get my employees
export const getMyEmployees = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/jobs/myemployees');
    dispatch({
      type: GET_APPLYS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RJOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
