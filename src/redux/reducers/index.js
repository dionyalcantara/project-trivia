import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  GRAVATAR_EMAIL,
  SAVE_USERNAME,
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
      player: {
        ...state.player,
        isFetching: true,
      },
    };

  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      player: {
        ...state.player,
        isFetching: false,
        fetchingComplete: true,
      },
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    };

  case GRAVATAR_EMAIL:
    return {
      player: {
        ...state.player,
        gravatarEmail: action.payload,
      },
    };

  case SAVE_USERNAME:
    return {
      player: {
        ...state.player,
        name: action.payload,
      },
    };

  default:
    return state;
  }
};

export default reducer;
