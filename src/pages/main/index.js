import React, { Component } from 'react'
import { Grid } from '@mui/material'
import SideBar from './side-bar'
import ChatWindow from './chat-window'
import { io } from "socket.io-client";
import { useEffect } from 'react';
import Services from '../../network/services';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';



export default function Main() {

    const [loader, setLoader] = React.useState(false);
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()


    useEffect(() => {
        // const socket = io()
        // console.log('Making socket connection with server')
        // socket.on("connection", (socket) => {
        //     console.log("Making socket connection --------->" + socket.id);
        // });
        // socket.on("connect_error", (err) => {
        //     console.log(`connect_error due to ${err.message}`);
        //   });

        fetchChatWithReadMessage()
    }, [])


    const fetchChatWithReadMessage = async () => {
        try {
            setLoader(true)
            const data = await Services.ChatService.getChatWithReadMessages()
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    dispatch(actions.RecentChatActions.setInitialChats(data.data.response))
                    if (data.data.response.one_to_one_chat.length > 0) {
                        console.log("***** running if condition")
                        // dispatch(actions.RecentChatActions.setSelectedPosition(0))
                        // dispatch(actions.RecentChatActions.setSelectedChat(data.data.response.one_to_one_chat[0]))
                        // dispatch(actions.MessagesActions.setMessages([data.data.response.one_to_one_chat[0].last_message])) 
                    }else{
                        console.log("***** running else condition")
                    }
                }
                else {
                    // no recent chat available
                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }




    return (
        <Grid
            container
            direction={'row'}
            flex={1} style={{ height: '100%' }}>

            {/* Left Part */}
            <Grid
                item
                xl={3} lg={3} md={4}
                display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}
                sx={{ backgroundColor: '#ffbbbb' }} >
                <SideBar />
            </Grid>

            {/* Right Part */}
            <Grid
                item
                xl={9} lg={9} md={8} sm={12} xs={12}>
                <ChatWindow />
            </Grid>


        </Grid>
    )
}