import { Grid, TextField } from '@mui/material';
import React from 'react';
import COLORS from '../../../constants/Colors';
import ICONS from '../../../constants/Icons';
import ChatBox from './ChatBox';
import ChatTopBar from './ChatTopBar';



export default function ChatWindow() {

    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'} >

            <ChatTopBar />

            <ChatBox />

            <Grid
                container
                sx={{ width: '100%', backgroundColor: COLORS.TEAL_200, padding: 1 }}
                flexDirection={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}>

                <TextField
                    variant='standard'
                    multiline
                    maxRows={2}
                    onChange={(e) => { console.log(e) }}
                    InputProps={{ disableUnderline: true, style: { fontSize: 12, minHeight: 47 } }}
                    sx={{ display: 'flex', flex: 1, marginRight: 1, backgroundColor: 'white', borderRadius: 10, paddingInline: 3 }} />
                <div style={{ backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 7 }}>
                    <ICONS.SEND_MESSAGE style={{ width: 25, height: 25, color: COLORS.PRIMARY }} onClick={() => {
                        // handleOnMessgaeAdd()
                    }} />
                </div>
            </Grid>
        </Grid>
    )
}