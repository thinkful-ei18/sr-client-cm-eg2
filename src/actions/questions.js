import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const QUESTION_REQUEST = 'QUESTION_REQUEST';
export const questionRequest = () => ({
  type: QUESTION_REQUEST,
})

export const QUESTION_ERROR = 'QUESTION_ERROR';
export const questionError = error => ({
  type: QUESTION_ERROR,
  error
})

export const QUESTION_SUCCESS = 'QUESTION_SUCCESS';
export const questionSuccess = question => ({
  type: QUESTION_SUCCESS,
  question
})

//TODO: write fetch
export const getQuestion = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  dispatch(questionRequest());
  //TODO:change url;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ question }) => dispatch(questionSuccess(question)))
    .catch(err => {
      dispatch(questionError(err))
    })
}

export const answerQuestion = (question) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  //TODO:change url
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      question
    }),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => console.log(err));
};
