import { combineReducers } from 'redux';
import signup from './signup';
import adminSignup from './adminSignup';
import signin from './signin';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  signin,
  signup,
  // userAccDetails,
  adminSignup,
  // adminLogin,
  // clients,
  // transactions
});

export default rootReducer;
