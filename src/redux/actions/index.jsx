import { fetchToken } from '../../Services/Api';
import { addToken } from '../../Services/LocalStorage';

export const GET_TOKEN = 'GET_TOKEN';
export const REQUEST_API = 'REQUEST_API';

export const getToken = (token) => ({ type: GET_TOKEN, token });
export const requestApi = () => ({ type: REQUEST_API });

export function callApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    const result = await fetchToken();
    addToken(dispatch(getToken(result)).token.token);
    // console.log(dispatch(getToken(result)));
    return dispatch(getToken(result));
  };
}
