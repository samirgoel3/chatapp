const setRecentChat = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_recent_chat',
            payload:data
        })
    }
}






export default {setRecentChat}