import React, { Component } from 'react'
import { Grid } from '@mui/material'
import SideBar from './side-bar'
import ChatWindow from './chat-window'
import { io } from "socket.io-client";
import { useEffect } from 'react';


export default function Main() {

    useEffect(() => {
        // const socket = io()
        // console.log('Making socket connection with server')
        // socket.on("connection", (socket) => {
        //     console.log("Making socket connection --------->" + socket.id);
        // });
        // socket.on("connect_error", (err) => {
        //     console.log(`connect_error due to ${err.message}`);
        //   });
    }, [])




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