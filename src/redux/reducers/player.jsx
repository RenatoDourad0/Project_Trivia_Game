import { POINTS } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case POINTS:
    return {
      ...state,
      score: state.score + action.points,
    };

  default:
    return state;
  }
}
