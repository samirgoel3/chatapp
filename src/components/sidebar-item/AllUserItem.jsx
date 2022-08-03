import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';




export default function AllUserItem({element, position}){
    
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Grid item sx={{ display: 'flex', padding:1, justifyContent: 'flex-start', alignItems: 'center', width: '100%', backgroundColor: position== stateData.recentChatData.selected_position?COLORS.PRIMARY_DARK:COLORS.PRIMARY_LIGHT }}
        direction={'row'} >
        <Avatar sx={{ width: 60, height: 60 }}  />
        <Grid container direction={'column'} sx={{ marginLeft: 1 }} >
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15 }}>User Name</Typography>
            <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 11 }}>emailemail@gmail.com</Typography>
            <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 11 }}>Joined on 23 March 2022</Typography>
        </Grid>
    </Grid>
    )
}