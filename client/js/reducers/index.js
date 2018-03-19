import { combineReducers } from 'redux';
import signup from './signup';
import adminSignup from './adminSignup';
import signin from './signIn';
import bills from './bills';
import bill from './bill';
import opinion from './opinion';
import users from './users';
import user from './user';
import search from './search';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  signin,
  signup,
  bills,
  bill,
  adminSignup,
  opinion,
  users,
  user,
  search
});

export default rootReducer;
