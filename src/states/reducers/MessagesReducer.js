const initialState = {
    messages:[]
}

const MessagesReducer = (state = initialState, action)=>{
    if(action.type === 'set_messages'){
        return {
            ...state,
            messages:action.payload
        };
    }else{
        return state;
    }
}

export default MessagesReducer;