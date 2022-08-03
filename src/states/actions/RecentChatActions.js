const setInitialChats = (data)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'set_initial_chat',
            payload:{
                group_chats:data.group_chat,
                recent_chats:data.one_to_one_chat
            }
        })
    }
}



const setSelectedPosition = (position)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_position',
            payload:position
        })
    }
}


const setSelectedChat = (selectedChat)=>{
    return async ( dispatch) =>{
        dispatch({
            type:'select_chat',
            payload:selectedChat
        })
    }
}








export default {setInitialChats, setSelectedPosition, setSelectedChat}