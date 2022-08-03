import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';




export default function RecentChatItem({element, position}){
    
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Grid item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 60, width: '100%', backgroundColor: position== stateData.recentChatData.selected_position?COLORS.PRIMARY_DARK:COLORS.PRIMARY_LIGHT }}
        direction={'row'} onClick={()=>{ 
            dispatch(actions.RecentChatActions.setSelectedPosition(position)) 
            dispatch(actions.RecentChatActions.setSelectedChat(element)) 
            dispatch(actions.MessagesActions.setMessages([element.last_message])) 
            }}>
        <Avatar sx={{ width: 40, height: 40 }} src={element.chaticon} />
        <Grid container direction={'column'} sx={{ marginLeft: 1 }} >
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{element.chatname}</Typography>
            <Grid container justifyContent={'center'} alignItems={'center'} direction={'row'}>
                <Grid item flex={1}>
                <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 10 ,paddingRight:1, maxWidth:200, textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>{element.last_message.content.message}</Typography>
                </Grid>
                <Grid item>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 9 }}>Fri 03:44 PM</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}