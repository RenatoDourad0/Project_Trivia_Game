import { POINTS, CHECK_CORRECT_ANSWERS } from '../actions';

const INITIAL_STATE = {
  // name: nome-da-pessoa,
  assertions: 0,
  // gravatarEmail: email-da-pessoa,
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

  default:
    return state;
  }
}
