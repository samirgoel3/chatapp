import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import COLORS from '../../constants/Colors'
import Session from '../../storage/Session';

export default function UserInfo() {
    return (
        <div >
            
            <Grid container sx={{backgroundColor:COLORS.PRIMARY_DARK, borderRadius:2, padding:'3px 10px'}} justifyContent={'center'} alignItems={'center'}>
                <Typography sx={{fontWeight:700, fontSize:10, color:'white'}}>{Session.getUserData().username}</Typography>
                <Avatar
                    sx={{ width: 20, height: 20, marginLeft:1}}
                    src={Session.getUserData().image} />

            </Grid>
        </div>
    )
}