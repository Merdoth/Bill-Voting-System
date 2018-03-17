import { combineReducers } from 'redux';
import signup from './signup';
import adminSignup from './adminSignup';
import signin from './signIn';
import bills from './bills';
import bill from './bill';
import opinion from './opinion';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  signin,
  signup,
  bills,
  bill,
  adminSignup,
  opinion
});

export default rootReducer;
