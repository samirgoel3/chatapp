import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../constants/Colors'


export default function SidebarItem({element, position}){
    return (
        <Grid item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 60, width: '100%', backgroundColor: position== 1?COLORS.PRIMARY_DARK:COLORS.PRIMARY_LIGHT }}
        direction={'row'} >
        <Avatar sx={{ width: 40, height: 40 }} src={element.image} />
        <Grid container direction={'column'} sx={{ marginLeft: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{element.username}</Typography>
            <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 10 }}> last message that user has send to the chat</Typography>
        </Grid>
    </Grid>
    )
}