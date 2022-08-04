const initialState = {
    messages:[]
}

const MessagesReducer = (state = initialState, action)=>{
    if(action.type === 'set_messages'){
        return {
            ...state,
            messages:action.payload
        };
    }if(action.type === 'remove_all_messages'){
        return {
            ...state,
            messages:[]
        };
    }else{
        return state;
    }
}

export default MessagesReducer;