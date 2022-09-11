import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import player from './player';

const rootReducer = combineReducers({ loginReducer, gameReducer, player });

export default rootReducer;
