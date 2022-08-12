import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';
import Storage from '../../storage';
import { dispatch as busDispatch } from 'use-bus'


export default function RecentChatItem({ element, position }) {

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Grid item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 60, width: '100%', backgroundColor: position == stateData.recentChatData.selected_position ? COLORS.TEAL_A700 : COLORS.PRIMARY_LIGHT, position: 'relative' }}
            direction={'row'} onClick={() => {
                if (position != stateData.recentChatData.selected_position) {
                    dispatch(actions.RecentChatActions.setSelectedPosition(position))
                    dispatch(actions.RecentChatActions.setSelectedChat(element))
                    dispatch(actions.MessagesActions.setMessages(element.last_message == null ? [] : [element.last_message]))
                    busDispatch('CLOSE_DRAWER')
                }
            }}>
            <Avatar sx={{ width: 40, height: 40 }} src={element.chaticon} />
            <Grid container direction={'column'} sx={{ marginLeft: 1 }} >
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{element.chatname}</Typography>
                <Grid container justifyContent={'center'} alignItems={'center'} direction={'row'}>
                    <Grid item flex={1}>
                        <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 10, paddingRight: 1, maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{element.last_message == null ? "- - - -" : element.last_message.content.message}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 9 }}>{element.last_message != null? element.last_message.createdAt : null}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {
                element.last_message != null ?

                    element.last_message.sender._id == Storage.Session.getUserData()._id ? null :
                        element.unread_message_count > 0 ?
                            <Typography sx={{ position: 'absolute', right: 5, padding: '3px 5px', top: 10, backgroundColor: 'red', borderRadius: 40, color: 'white', fontWeight: 700, fontSize: 10 }}>{element.unread_message_count}</Typography>
                            : null
                    : null
            }


        </Grid>
    )
}