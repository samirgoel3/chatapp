import { Button, Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ICONS from '../../../constants/Icons';
import CircularProgress from '@mui/material/CircularProgress';


export default function SearchBar({ addGroupVisibility }) {
    return (
        <Grid container flexDirection={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} padding={1}>
            <Grid item flex={1}>
                <Paper sx={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', paddingLeft: 1, paddingRight: 1 }}>
                    <TextField variant='standard' placeholder='Search User' sx={{ flex: 1 }} InputProps={{ disableUnderline: true }} />
                    <CircularProgress size={15} sx={{ marginInline: 1 }} />
                    <ICONS.SEARCH color='#bbb' />
                </Paper>
            </Grid>

            <Grid item>
                {
                    addGroupVisibility ?
                        <Button variant='contained' sx={{ fontSize: 13, paddingInline: 1, fontWeight: 700, borderRadius:1, height:40 }}>Create Group</Button> :
                        null
                }
            </Grid>


        </Grid>
    )
}