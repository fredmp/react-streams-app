import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = { isSignedIn: null, userId: null };

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
     return state;
  }
};

export default combineReducers({
  auth,
  form
});
