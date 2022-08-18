const selectOneToOneChat = (chatId)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_one_to_one_chat',
            payload:chatId
        })
    }
}






export default {selectOneToOneChat}