import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateRecruiterprofile from './components/profileforms/CreateRecruiterProfile';
import CreateApplicantprofile from './components/profileforms/CreateApplicantProfile';
import EditApplicantprofile from './components/profileforms/EditApplicantProfile';
import EditRecruiterprofile from './components/profileforms/EditRecruiterProfile';
import AddEdu from './components/profileforms/AddEdu';
import ReviewEdu from './components/profileforms/ReviewEdu';
import MyProfile from './components/profileforms/MyProfile';
import CreateJob from './components/jobs/CreateJob';
import ViewJob from './components/jobs/ViewJob';
import EditJob from './components/jobs/EditJob';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import ApplyJob from './components/jobs/ApplyJob';
import MyApplications from './components/jobs/MyApplications';
import MyEmployees from './components/jobs/MyEmployees';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/createrecruiterprofile'
                component={CreateRecruiterprofile}
              />
              <PrivateRoute
                exact
                path='/createapplicantprofile'
                component={CreateApplicantprofile}
              />
              <PrivateRoute
                exact
                path='/editapplicantprofile'
                component={EditApplicantprofile}
              />
              <PrivateRoute
                exact
                path='/editrecruiterprofile'
                component={EditRecruiterprofile}
              />
              <PrivateRoute exact path='/addedu' component={AddEdu} />
              <PrivateRoute exact path='/reviewedu' component={ReviewEdu} />
              <PrivateRoute exact path='/myprofile' component={MyProfile} />
              <PrivateRoute exact path='/createjob' component={CreateJob} />
              <PrivateRoute exact path='/viewjob/:id' component={ViewJob} />
              <PrivateRoute exact path='/editjob/:id' component={EditJob} />
              <PrivateRoute exact path='/applyjob/:id' component={ApplyJob} />
              <PrivateRoute
                exact
                path='/myapplications'
                component={MyApplications}
              />
              <PrivateRoute exact path='/myemployees' component={MyEmployees} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
