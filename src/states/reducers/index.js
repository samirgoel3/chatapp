import {combineReducers} from 'redux';
import ErrorDialogReducer from './ErrorDialogReducer';
import RecentChatReducer from './RecentChatReducer';
import MessagesReducer from './MessagesReducer';
import SelectorReducer from './SelectorReducer';
import ChatReducer from './ChatReducer';

const reducers = combineReducers({errorDialogData:ErrorDialogReducer, recentChatData:RecentChatReducer, messagesData:MessagesReducer, selectorData:SelectorReducer, chatData:ChatReducer})

export default reducers;