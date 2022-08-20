import React, { useEffect, useState } from 'react';
import ChatBox from './chat-box';
import ChatInput from './chat-input';
import ChatBar from './chat-bar';
import IndexedDbResolver from '../../../../databse';
import { Typography } from '@mui/material';






export default function MainChatView({ chatId }) {

    const [chat,setChat] = React.useState([])


    useEffect(()=> {fetchChatfromDb()}, [chatId])

    const fetchChatfromDb = async() =>{
        let chat = await  IndexedDbResolver.getSpecificChatByChatId(chatId)
        setChat(chat)
    
    }
    
    return <div>
        <ChatBar chatData={chat} />
        <ChatBox chatData={chat}   />
        <ChatInput chatId={chatId}/>
    </div>

}