import * as type from './actionTypes';

function requestStarted() {
  return { type: type.REQUEST_STARTED };
}

function requestSuccessful(data) {
  return {
    type: type.REQUEST_SUCCESSFUL,
    payload: data,
  };
}

export function requestFailed(error) {
  return {
    type: type.REQUEST_FAILED,
    payload: error,
  };
}

const requestGravatar = (url) => ({
  type: type.GRAVATAR_EMAIL,
  url,
});

export function fetchTrivia() {
  return async (dispatch) => {
    dispatch(requestStarted());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(requestSuccessful());
    localStorage.setItem('token', data.token);
  };
}

export const generateGravatar = (hash) => async (dispatch) => {
  dispatch(requestStarted());
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return dispatch(requestGravatar(response.url));
};

export const saveName = (userName) => ({
  type: type.SAVE_USERNAME,
  payload: userName,
});
