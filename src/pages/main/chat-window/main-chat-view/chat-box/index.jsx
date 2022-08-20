import { Button, Grid, Stack, CircularProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useBus from 'use-bus'
import Services from '../../../../../network/services'
import { actions } from '../../../../../states/actions'
import Storage from '../../../../../storage'
import LeftChatBox from './LeftMessage'
import RightChatBox from './RightMessage'
import ChatBackground from '../../../../../images/chat-background.png';



export default function ChatBox({ chatData }) {

    const bottomRef = React.useRef(null);
    const [loader, setLoader] = React.useState(false)
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()



    // useEffect(() => {
    //     bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    // }, [message]);


    // sx={{backgroundImage:`url(${ChatBackground})`, backgroundSize:'cover'}}

    return (
        <div style={{ position: 'relative' }}>
            <Grid container alignItems={'flex-end'} sx={{ overflowY: 'scroll', height: '80vh', position: 'relative', backgroundImage:`url(${ChatBackground})`, backgroundSize:'cover' }} >

                <Stack style={{ width: '100%' }}>
                    {
                        chatData.messages ?
                            chatData.messages.map((e, i) =>
                               {
                                return e.sender._id == Storage.Session.getUserData()._id ?
                                <RightChatBox data={e} /> : <LeftChatBox data={e} chat_id={chatData.chat_id}/>
                               }
                            )
                            :
                            null

                    }
                    <div ref={bottomRef} />

                </Stack>
            </Grid>

        </div>

    )
}