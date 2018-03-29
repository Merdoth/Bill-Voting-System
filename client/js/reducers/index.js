import { combineReducers } from 'redux';
import signup from './signup';
import adminSignup from './adminSignup';
import signin from './signIn';
import bills from './bills';
import bill from './bill';
import opinion from './opinion';
import usersReducer from './usersReducer';
import user from './user';
import search from './search';
import userVotedBill from './userVotedBill';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  signin,
  signup,
  bills,
  bill,
  adminSignup,
  opinion,
  usersReducer,
  user,
  search,
  userVotedBill
});

export default rootReducer;
