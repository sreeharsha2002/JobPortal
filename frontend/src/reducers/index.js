import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import rjob from './rjob';

export default combineReducers({
  alert,
  auth,
  profile,
  rjob,
});
