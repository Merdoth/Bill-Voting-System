
import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import CheckLoggedinUser from '../utils/CheckLoggedInUser';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import SuperAdminSignup from '../components/SuperAdminSignup';
import NotFound from '../components/NotFound';
import ClientDashboard from '../components/ClientDashboard';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path="/"
        name="landing"
        component={Signin}
      />
      <Route
        path="/register"
        name="signup"
        component={Signup}
      />
      <Route
        path="/admin/signup"
        name="admin-signup"
        component={SuperAdminSignup}
      />
      <Route
        path="/dashboard"
        name="dashboard"
        component={ClientDashboard}
      />
      <Route
        path="*"
        component={NotFound}
      />
    </Switch>
  </Router>
);
export default App;
