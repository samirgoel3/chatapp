import React, { Component, useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import LeftChatBox from './LeftChatBox'
import COLORS from '../../../constants/Colors'
import RightChatBox from './RightChatBox'



export default function ChatBox(){

    const [message, setMessage] = React.useState(["", "","", "","", "","", "","", ""])
    const bottomRef = React.useRef(null);
    

    const handleOnMessgaeAdd = () => {
        setMessage(c => [...c, ""])
    }

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [message]);


    return(
        <Grid container alignItems={'flex-end'} sx={{ overflowY: 'scroll', backgroundColor: COLORS.PRIMARY_EXTRA_LIGHT, height: '80vh' }} >
                <Stack>
                    {
                        message.map((e, i) => {return <LeftChatBox />})
                    }
                    <div ref={bottomRef} />
                    <RightChatBox/>
                </Stack>

            </Grid>

    )
}