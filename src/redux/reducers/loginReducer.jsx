import { GET_TOKEN, GET_INFO, GET_QUEST_INFO, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: {},
  questions: undefined,
  currentQuestion: 1,
};

const five = 5;

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

  case GET_QUEST_INFO:
    return {
      ...state,
      questions: action.info,
    };

  case NEXT_QUESTION:
    return {
      ...state,
      currentQuestion: state.currentQuestion === five ? 1 : state.currentQuestion + 1,
    };

  default:
    return state;
  }
}
