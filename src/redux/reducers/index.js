import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
    isFetching: false,
    fetchingComplete: false,
    errorMessage: '',
    data: {},
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // desenvolver cases para cada action
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
      errorMessage: '',
    };

  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      fetchingComplete: true,
      errorMessage: '',
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
};

export default reducer;
