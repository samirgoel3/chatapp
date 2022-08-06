import { Button, Grid, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import COLORS from '../../../../../constants/Colors'
import Services from '../../../../../network/services'
import { actions } from '../../../../../states/actions'
import Storage from '../../../../../storage'
import LeftChatBox from './LeftMessage'
import RightChatBox from './RightMessage';
import { useEffect } from 'react'


var mInterval = null;
export default function ChatBox({ chat_id }) {

    const [message, setMessage] = React.useState(["", "", "", "", "", "", "", "", "", ""])
    const bottomRef = React.useRef(null);
    const [loader, setLoader] = React.useState(false)
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()
    


    // useEffect(() => {
    //     bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    // }, [message]);

    useEffect(() => {
        if (mInterval != null) {
            console.log('**** Clearing interval')
            clearInterval(mInterval)
        }
        // mInterval = setInterval(() => {
        //     // console.log('**** Some chat id ' + chat_id)
        //     fetchChat(chat_id)
        // }, 1000);
    }, [chat_id]);



    const fetchChat = async (chat_id) => {
        try {
            setLoader(true)
            const data = await Services.MessageService.getAllMessagesByChatId(chat_id)

            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    dispatch(actions.MessagesActions.setMessages(data.data.response))
                    setTimeout(() => {
                        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
                    }, 500)
                }
                else {
                    dispatch(actions.ErrorDialogActions.showError({ header: "No Data Found", description: "" + data.data.message }))
                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }



    return (
        <div style={{ position: 'relative' }}>
            <Grid container alignItems={'flex-end'} sx={{ overflowY: 'scroll', backgroundColor: COLORS.PRIMARY_EXTRA_LIGHT, height: '80vh', position: 'relative' }} >

                <Stack style={{ width: '100%' }}>
                    {
                        stateData.messagesData.messages.map((e, i) => {
                            return e.sender._id == Storage.Session.getUserData()._id ?
                                <RightChatBox data={e} /> : <LeftChatBox data={e} chat_id={chat_id}/>
                        })
                    }
                    <div ref={bottomRef} />

                </Stack>
            </Grid>
            <Button
                variant='contained'
                onClick={() => { fetchChat(chat_id); }}
                sx={{ position: 'absolute', top: 10, right: 10, fontSize: 8 }}>RELOAD {chat_id}</Button>
        </div>

    )
}