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

export const generateGravatar = (hash) => ({
  type: type.GRAVATAR_EMAIL,
  payload: `https://www.gravatar.com/avatar/${hash}`,
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

export const saveName = (userName) => ({
  type: type.SAVE_USERNAME,
  payload: userName,
});
