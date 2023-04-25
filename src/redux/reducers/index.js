import { combineReducers } from 'redux';
import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  GRAVATAR_EMAIL,
  SAVE_USERNAME,
  ADD_SCORE,
  INCREASE_ASSERTIONS,
  RESET_LOGIN,
  RESET_FETCH,
} from '../actions/actionTypes';

const INITIAL_STATE_LOGIN = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const INITIAL_STATE_FETCH = {
  isFetching: false,
  fetchingComplete: false,
};

const reducerLogin = (state = INITIAL_STATE_LOGIN, action) => {
  switch (action.type) {
  case GRAVATAR_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SAVE_USERNAME:
    return {
      ...state,
      name: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case INCREASE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case RESET_LOGIN:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

const reducerFetch = (state = INITIAL_STATE_FETCH, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      fetchingComplete: true,
    };
  case RESET_FETCH:
    return {
      ...state,
      fetchingComplete: false,
    };
  default:
    return state;
  }
};

const reducer = combineReducers({
  player: reducerLogin,
  fetch: reducerFetch,
});

export default reducer;
