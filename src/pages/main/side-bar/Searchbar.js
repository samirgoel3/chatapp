import { Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ICONS from '../../../constants/Icons';
import CircularProgress from '@mui/material/CircularProgress';

export default function SearchBar() {
    return (
        <Grid container  >
            <Paper sx={{ flexDirection: 'row', height: 40, width: '100%', m: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', paddingLeft: 1, paddingRight: 1 }}>
                <TextField variant='standard' placeholder='Search User' sx={{ flex: 1 }} InputProps={{ disableUnderline: true }}/>
                <CircularProgress size={15} sx={{marginInline:1}}/>
                <ICONS.SEARCH color='#bbb' />
            </Paper>



        </Grid>
    )
}