
import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import CheckLoggedinUser from '../utils/CheckLoggedInUser';
import AuthenticateUser from '../utils/AuthenticateUser';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import SuperAdminSignup from '../components/SuperAdminSignup';
import NotFound from '../components/NotFound';
import AdminDashboard from '../components/AdminDashboard';
import Home from '../components/Home';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path="/"
        name="landing"
        component={CheckLoggedinUser(Home)}
      />
      <Route
        exact
        path="/signin"
        name="landing"
        component={CheckLoggedinUser(Signin)}
      />
      <Route
        path="/register"
        name="signup"
        component={CheckLoggedinUser(Signup)}
      />
      <Route
        path="/admin/signup"
        name="admin-signup"
        component={CheckLoggedinUser(SuperAdminSignup)}
      />
      <Route
        path="/dashboard"
        name="dashboard"
        component={AuthenticateUser(AdminDashboard)}
      />
      <Route
        path="*"
        component={NotFound}
      />
    </Switch>
  </Router>
);
export default App;
