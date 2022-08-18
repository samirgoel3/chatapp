const initialState = {
    selected_one_to_one_chat:null,
    selected_group_chat:null

}

const SelectorReducer = (state = initialState, action)=>{
    if(action.type === 'select_one_to_one_chat'){
        return {
            ...state,
            selected_one_to_one_chat:action.payload,
        };
    }else{
        return state;
    }
}

export default SelectorReducer;