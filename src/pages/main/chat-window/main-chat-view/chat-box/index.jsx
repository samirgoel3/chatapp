import { Button, Grid, Stack, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useBus from 'use-bus'
import Services from '../../../../../network/services'
import { actions } from '../../../../../states/actions'
import Storage from '../../../../../storage'
import LeftChatBox from './LeftMessage'
import RightChatBox from './RightMessage'



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


    useBus(
        'FETCH_CHAT',()=>{
            fetchChat()
        }
      )



    const fetchChat = async () => {
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
            <Grid container alignItems={'flex-end'} sx={{ overflowY: 'scroll',height: '80vh', position: 'relative' }} >
                
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

            <div></div>
           
           
            <Button
                variant='contained'
                onClick={() => { fetchChat(); }}
                sx={{ position: 'absolute', top: 10, right: 10, fontSize: 8 }}>
                     {loader?<CircularProgress size={15} sx={{color:'white'}}/>:'Reload' }
                     </Button> 
        </div>

    )
}