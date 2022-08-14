import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';
import { dispatch as busDispatch } from 'use-bus'




export default function GroupChatItem({element, position}){
    
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Grid  item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 80, width: '100%', backgroundColor: position== stateData.recentChatData.selected_position?COLORS.TEAL_A700:COLORS.PRIMARY_LIGHT }}
        direction={'row'} >
        {/* <Avatar sx={{ width: 40, height: 40 }} src={""} /> */}
        <Grid container direction={'column'} sx={{ marginLeft: 1 }} onClick={()=>{
            if (position != stateData.recentChatData.selected_position) {
                dispatch(actions.RecentChatActions.setSelectedPosition(position))
                dispatch(actions.RecentChatActions.setSelectedChat(
                    {
                        chat_id:""+element._id,
                        chatname:""+element.chatname,
                        chaticon:"",
                        last_message:null,
                        users:element.users,

                    }
                ))
                dispatch(actions.MessagesActions.setMessages([]))
                busDispatch('CLOSE_DRAWER')
            }
        }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom:1 }}>{element.chatname}</Typography>
            <Grid container justifyContent={'center'} alignItems={'center'} direction={'row'}>
                <Grid item flex={1}>
                <Grid  container direction={'row'} x={{ color: 'white', fontWeight: 400, fontSize: 10 ,paddingRight:1, maxWidth:200, whiteSpace:'nowrap'}}>
                    {element.users.map((el, i)=>{
                        return <Avatar src={el.image} sx={{ width: 30, height: 30, border:'2px solid white', marginLeft:-0.7}}/>
                    })}
                </Grid>
                </Grid>
                <Grid item>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 9 }}>
                    Fri 03:44 PM</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}