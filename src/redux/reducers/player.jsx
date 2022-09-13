import { POINTS, CHECK_CORRECT_ANSWERS, RESET_STATE } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case POINTS:
    return {
      ...state,
      score: state.score + action.points,
    };

  case CHECK_CORRECT_ANSWERS:
    return {
      ...state,
      assertions: state.assertions + action.times,
    };
  case RESET_STATE:
    return {
      assertions: 0,
      score: 0,
    };

  default:
    return state;
  }
}
