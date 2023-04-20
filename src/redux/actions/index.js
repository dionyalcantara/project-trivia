import * as type from './actionTypes';

export function requestStarted() {
  return { type: type.REQUEST_STARTED };
}

export function requestSuccessful(data) {
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

export function fetchTrivia() {
  return (dispatch) => {
    dispatch(requestStarted());
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`)
          .then((responseTwo) => responseTwo.json())
          .then((dataTwo) => {
            dispatch(requestSuccessful());
            console.log(dataTwo);
          });
      });
  };
}

export const generateGravatar = (hash) => async (dispatch) => {
  dispatch(requestStarted());
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const data = await response.json();
  return dispatch(requestSuccessful(data));
};
