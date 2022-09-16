import { GET_TOKEN, GET_INFO, REQUEST_API } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  loading: false,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
      loading: false,
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
