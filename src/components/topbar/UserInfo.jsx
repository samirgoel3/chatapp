import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import COLORS from '../../constants/Colors'
export default function UserInfo() {
    return (
        <div >
            <Grid container sx={{backgroundColor:COLORS.PRIMARY_DARK, borderRadius:2, padding:'3px 10px'}} justifyContent={'center'} alignItems={'center'}>
                <Typography sx={{fontWeight:700, fontSize:10, color:'white'}}>User name Goes here</Typography>
                <Avatar
                    sx={{ width: 20, height: 20, marginLeft:1}}
                    src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80' />

            </Grid>
        </div>
    )
}