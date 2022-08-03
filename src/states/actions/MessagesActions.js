const setMessages = (messagesArray)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_messages',
            payload:messagesArray
        })
    }
}


export default {setMessages}