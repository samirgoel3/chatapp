import React, { Component } from 'react'
import { Grid, Avatar, Typography } from '@mui/material'
import ICONS from '../../../constants/Icons'
import COLORS from '../../../constants/Colors'
import { faker } from '@faker-js/faker'
import MobileRightSideDrawer from './MobileRightSideDrawer'

export default function ChatTopBar({chatData}) {
    return (
        <Grid
            container
            sx={{ width: '100%', height: 50, backgroundColor: COLORS.PRIMARY_LIGHT, paddingInline: 2 }}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}>
            <Avatar style={{ width: 35, height: 35 }} src={chatData.chaticon} />
            <Grid container flexDirection={'column'} flex={1} sx={{ paddingInline: 2 }}>
                <Typography sx={{ color: 'white', fontSize: 15, fontWeight: 700 }}>{chatData.chatname + ' CHAT ID: '+ chatData.chat_id}</Typography>
                <Typography sx={{ color: 'white', fontSize: 10, fontWeight: 400 }}>Last seen 04:34 PM</Typography>
            </Grid>
            <ICONS.OPEN_EYE_ICON style={{ width: 20, height: 20, color: 'white' }} />
            <Grid display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }} sx={{marginInline:2}}>
                <MobileRightSideDrawer/>
            </Grid>
        </Grid>
    )
}