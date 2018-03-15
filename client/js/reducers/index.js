import { combineReducers } from 'redux';
import signup from './signup';
import adminSignup from './adminSignup';
import signin from './signIn';
import bills from './bills';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  signin,
  signup,
  bills,
  adminSignup
});

export default rootReducer;
