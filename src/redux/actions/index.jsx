import { fetchToken, fetchQuestions } from '../../Services/Api';
import { addToken } from '../../Services/LocalStorage';

export const GET_TOKEN = 'GET_TOKEN';
export const REQUEST_API = 'REQUEST_API';
export const GET_INFO = 'GET_INFO';

export const GET_QUEST_INFO = 'GET_QUEST_INFO';

export const NEXT_QUESTION = 'NEXT_QUESTION';

export const TIME_OUT = 'TIME_OUT';
export const POINTS = 'POINTS';

export const getToken = (token) => ({ type: GET_TOKEN, token });
export const requestApi = () => ({ type: REQUEST_API });
export const getInfo = (info) => ({ type: GET_INFO, info });

export const getQuestionsInfo = (info) => ({ type: GET_QUEST_INFO, info });

export function callApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    const result = await fetchToken();
    addToken(dispatch(getToken(result)).token.token);
    return dispatch(getToken(result));
  };
}

export function getQuestions(token) {
  return async (dispatch) => {
    const questions = await fetchQuestions(token);
    dispatch(getQuestionsInfo(questions));
  };
}

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const timeOut = (time) => ({ type: TIME_OUT, time });
export const pointsTotal = (points) => ({ type: POINTS, points });
