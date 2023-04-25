import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  GRAVATAR_EMAIL,
  SAVE_USERNAME,
  ADD_SCORE,
  INCREASE_ASSERTIONS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    isFetching: false,
    fetchingComplete: false,
    data: {},
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
  case ADD_SCORE:
    return {
      player: {
        ...state.player,
        score: state.player.score + action.payload,
      },
    };
  case INCREASE_ASSERTIONS:
    return {
      player: {
        ...state.player,
        assertions: state.player.assertions + 1,
      },
    };
  default:
    return state;
  }
};

export default reducer;
