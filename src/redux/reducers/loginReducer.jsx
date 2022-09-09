import { GET_TOKEN, GET_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };

  case GET_INFO:
    return {
      ...state,
      name: action.info.name,
      email: action.info.email,
    };

  default:
    return state;
  }
}
