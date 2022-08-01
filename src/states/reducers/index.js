import {combineReducers} from 'redux';
import ErrorDialogReducer from './ErrorDialogReducer';

const reducers = combineReducers({errorDialogData:ErrorDialogReducer})

export default reducers;