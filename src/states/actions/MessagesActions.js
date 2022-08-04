const setMessages = (messagesArray)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_messages',
            payload:messagesArray
        })
    }
}


const removeAllMessages = ()=>{
    return async ( dispatch) =>{
        dispatch({
            type:'remove_all_messages',
            payload:null
        })
    }
}




export default {setMessages, removeAllMessages}