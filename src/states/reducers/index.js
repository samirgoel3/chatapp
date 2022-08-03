import {combineReducers} from 'redux';
import ErrorDialogReducer from './ErrorDialogReducer';
import RecentChatReducer from './RecentChatReducer';
import MessagesReducer from './MessagesReducer';

const reducers = combineReducers({errorDialogData:ErrorDialogReducer, recentChatData:RecentChatReducer, messagesData:MessagesReducer})

export default reducers;