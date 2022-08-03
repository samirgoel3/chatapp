import React from 'react';
import ChatBox from './chat-box';
import ChatInput from './chat-input';
import ChatBar from './chat-bar';




export default function MainChatView({ selectedChat }) {
    return <div>
        <ChatBar chatData={selectedChat} />
        <ChatBox chat_id={selectedChat.chat_id} />
        <ChatInput chatData={selectedChat}/>
    </div>

}