import React, { Component } from 'react'
import { Grid } from '@mui/material'
import SideBar from './side-bar'
import ChatWindow from './chat-window'
import { io } from "socket.io-client";
import { useEffect } from 'react';
import useBus from 'use-bus';



function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

export default function Main() {
    const [windowSize, setWindowSize] = React.useState(getWindowSize())

    var socket;

    const makeSocketConnection = () => {
         socket = io('http://192.168.0.109:5000')
        // const socket = io()
        console.log('Making socket connection with server')
        socket.on("connection", (socket) => {
            console.log("Making socket connection --------->" + socket.id);
        });
        socket.on("connect_error", (err) => {
            // console.log(`connect_error due to ${err.message}`);
        });
        return socket ;
    }

    useBus("TEST", ()=>{
        socket.emit('TESTER', "hey i am emitting some data , have you hgot it")
    })








    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        makeSocketConnection()

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);



    return (
        <Grid
            container
            direction={'row'}
            flex={1} style={{
                height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 55) : (windowSize.innerHeight - 55),
                backgroundColor: '#bbbbbb'
            }}>

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