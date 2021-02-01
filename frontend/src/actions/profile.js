import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILEEDU } from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get profile by id
export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update
export const createProfile = (
  formData,
  history,
  edit = false,
  create = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'profile Updated' : 'Profile Created', 'success'));
    if (!edit && !create) {
      history.push('/dashboard');
    }
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
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add edu
export const addEdu = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('api/profile/edu', formData, config);

    dispatch({
      type: UPDATE_PROFILEEDU,
      payload: res.data,
    });

    dispatch(setAlert('Education added to profile', 'success'));
    history.push('/editapplicantprofile');
  } catch (err) {
    const errors = err.response.data.errors;
    const inerror = err.response.data;
    if (inerror) {
      dispatch(setAlert(inerror.msg, 'danger'));
    }
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    return errors;
  }
};

// delete education

export const deleteEdu = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/edu/${id}`);
    dispatch({
      type: UPDATE_PROFILEEDU,
      payload: res.data,
    });

    dispatch(setAlert('Education Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
