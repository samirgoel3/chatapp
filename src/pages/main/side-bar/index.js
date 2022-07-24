import { Grid } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../../constants/Colors';
import RecentChat from './RecentChatList';
import SearchBar from './Searchbar';
import TabsBar from './TabsBar';

export default function SideBar() {
    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>


            <Grid item sx={{ width: '100%' }}>
                <TabsBar />
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                <SearchBar />
            </Grid>

            <Grid item flex={1} >
                <RecentChat/>
            </Grid>



        </Grid>
    )
}