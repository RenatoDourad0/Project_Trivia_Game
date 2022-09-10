import { GET_QUEST_INFO, NEXT_QUESTION, TIME_OUT } from '../actions';

const INITIAL_STATE = {
  token: {},
  currentQuestion: 1,
  timer: false,
  score: 0,
};

const five = 5;

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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

  case TIME_OUT:
    return {
      ...state,
      timer: action.time,
    };

  default:
    return state;
  }
}
