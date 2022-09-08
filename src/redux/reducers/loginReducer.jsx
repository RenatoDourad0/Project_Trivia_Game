import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}
