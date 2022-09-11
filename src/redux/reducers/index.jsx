import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import player from './gameReducer';

const rootReducer = combineReducers({ loginReducer, player });

export default rootReducer;
