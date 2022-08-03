const initialState = {
    recent_chats:[],
    group_chats:[],
    selected_position:-1,
    selected_chat:null
}

const RecentChatReducer = (state = initialState, action)=>{
    if(action.type === 'set_initial_chat'){
        return {
            ...state,
            group_chats:action.payload.group_chats,
            recent_chats:action.payload.recent_chats,
        };
    }if(action.type === 'select_position'){
        return {
            ...state,
            selected_position:action.payload
        };
    }if(action.type === 'select_chat'){
        return {
            ...state,
            selected_chat:action.payload
        };
    }else{
        return state;
    }
}

export default RecentChatReducer;