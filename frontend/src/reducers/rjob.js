import {
  GET_RJOBS,
  RJOB_ERROR,
  CREATE_JOB,
  DELETE_JOB,
  SET_RJOB,
  RESET_RJOB,
  ADD_APPLY,
  CLEAR_JOBS,
  GET_APPLYS,
  RESET_APPLYS,
} from '../actions/types';

const initialstate = {
  rjobs: [],
  rjob: null,
  applicants: [],
  loading: true,
  error: {},
};

const RjobReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_RJOBS:
      return {
        ...state,
        rjobs: payload,
        rjob: null,
        loading: false,
      };
    case CREATE_JOB:
      return {
        ...state,
        rjobs: [...state.rjobs, payload],
        loading: false,
      };
    case SET_RJOB:
      return {
        ...state,
        rjob: payload,
        loading: false,
      };
    case GET_APPLYS:
      return {
        ...state,
        applicants: payload,
        loading: false,
      };
    case ADD_APPLY:
      return {
        ...state,
        applicants: [...state.applicants, payload],
        loading: false,
      };
    case RESET_APPLYS:
      return {
        ...state,
        applicants: [],
        loading: false,
      };
    case RESET_RJOB:
      return {
        ...state,
        rjob: null,
        error: payload,
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        rjobs: state.rjobs.filter((job) => job._id !== payload),
        loading: false,
      };
    case RJOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_JOBS:
      return {
        ...state,
        rjobs: [],
        rjob: null,
        applicants: [],
        error: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default RjobReducer;
