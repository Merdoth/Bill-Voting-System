
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
import Bills from '../components/Bills';
import Users from '../components/Users';
import userVotedBills from '../components/UserVotedBills';
import UpdateUser from '../components/UpdateUser';
import CreateBill from '../components/CreateBill';
import EditBill from '../components/EditBill';
import Home from '../components/Home';
import Search from '../components/Search';
import BillDetail from '../components/BillDetail';

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
        path="/users"
        name="users"
        component={AuthenticateUser(Users)}
      />
      <Route
        path="/profile"
        name="profile"
        component={AuthenticateUser(UpdateUser)}
      />
      <Route
        path="/search"
        name="search"
        component={AuthenticateUser(Search)}
      />
      <Route
        path="/admin/signup"
        name="admin-signup"
        component={CheckLoggedinUser(SuperAdminSignup)}
      />
      <Route
        path="/bills/create"
        name="createBill"
        component={AuthenticateUser(CreateBill)}
      />
      <Route
        path="/bills/voted"
        name="userVotedBills"
        component={AuthenticateUser(userVotedBills)}
      />
      <Route
        path="/bills/:billId/edit"
        name="editBill"
        component={AuthenticateUser(EditBill)}
      />
      <Route
        path="/bills/:billId"
        name="billDetail"
        component={AuthenticateUser(BillDetail)}
      />
      <Route
        path="/bills"
        name="bills"
        component={AuthenticateUser(Bills)}
      />
      <Route
        path="*"
        component={NotFound}
      />
    </Switch>
  </Router>
);
export default App;
