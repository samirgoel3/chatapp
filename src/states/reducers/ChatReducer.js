const initialState = {
    recent_chat:[],
    group_chat:[]

}

const ChatReducer = (state = initialState, action)=>{
    if(action.type === 'set_recent_chat'){
        return {
            ...state,
            recent_chat:action.payload,
        };
    }else{
        return state;
    }
}

export default ChatReducer;