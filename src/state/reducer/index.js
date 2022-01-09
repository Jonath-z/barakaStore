import { combineReducers } from 'redux';
import hiddenReducer from './hiddenReducer';

const reducers = combineReducers({
    hide: hiddenReducer
});

export default reducers;