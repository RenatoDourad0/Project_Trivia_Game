import { GET_TOKEN, GET_INFO, GET_QUEST_INFO, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
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
