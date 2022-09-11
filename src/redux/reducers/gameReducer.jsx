import { GET_QUEST_INFO, NEXT_QUESTION, TIME_OUT } from '../actions';

const INITIAL_STATE = {
  currentQuestion: 1,
  timer: false,
};

const five = 5;

export default function player(state = INITIAL_STATE, action) {
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

  case POINTS:
    return {
      ...state,
      score: state.score + action.points,
    };

  default:
    return state;
  }
}
