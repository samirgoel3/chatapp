import React, { Component } from 'react'
import { Grid, Avatar, CircularProgress, Typography } from '@mui/material';
import COLORS from '../../../constants/Colors';


export default function CreateChatView() {
    return (
        <Grid container height={50} backgroundColor={COLORS.PRIMARY_EXTRA_LIGHT} direction={'row'} justifyContent={'flex-start'} alignItems={'center'} padding={1}>
            <Grid item ><Avatar style={{ width: 25, height: 25, marginRight: 5 }} /></Grid>
            <Grid item flex={1}><Typography> Creating chat with username . . . </Typography></Grid>
            <CircularProgress size={15} sx={{ marginInline: 1 }} />
        </Grid>
    )
}