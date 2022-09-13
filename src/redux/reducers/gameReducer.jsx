import { DECREASE_TIMER, RESET_STATE,
  GET_QUEST_INFO, NEXT_QUESTION, RESTORE_TIMER, TIME_OUT } from '../actions';

const INITIAL_STATE = {
  currentQuestion: 1,
  timer: false,
  decrease: 6,
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
  case DECREASE_TIMER:
    return {
      ...state,
      decrease: state.decrease - 1,
    };
  case RESTORE_TIMER:
    return {
      ...state,
      decrease: 30,
    };
  case RESET_STATE:
    return {
      currentQuestion: 1,
      timer: false,
      decrease: 6,
    };
  default:
    return state;
  }
}
