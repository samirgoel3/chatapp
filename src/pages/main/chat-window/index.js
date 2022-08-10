import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import MainChatView from './main-chat-view';
import ChatBackground from '../../../images/chat-background.png';



export default function ChatWindow() {

    const stateData = useSelector(state => state)

    return (

        <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{backgroundImage:`url(${ChatBackground})`, backgroundSize:'cover'}}>
            {stateData.recentChatData.selected_chat == null ? null : <MainChatView selectedChat={stateData.recentChatData.selected_chat} />}
        </Grid>
    )
}