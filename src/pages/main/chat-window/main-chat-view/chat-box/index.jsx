import { Button, Grid, Stack, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useBus from 'use-bus'
import Services from '../../../../../network/services'
import { actions } from '../../../../../states/actions'
import Storage from '../../../../../storage'
import LeftChatBox from './LeftMessage'
import RightChatBox from './RightMessage'



export default function ChatBox({ chat_id }) {

    const bottomRef = React.useRef(null);
    const [loader, setLoader] = React.useState(false)
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()
    


    // useEffect(() => {
    //     bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    // }, [message]);

    useEffect(() => {fetchChat(chat_id)}, [chat_id]);


    useBus('FETCH_CHAT',(data)=>{
        fetchChat(data.payload.chat_id)
    })



    const fetchChat = async (chatId) => {
        try {
            setLoader(true)
            const data = await Services.MessageService.getAllMessagesByChatId(chatId)

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
                    // dispatch(actions.ErrorDialogActions.showError({ header: "No Data Found", description: "" + data.data.message }))
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
                onClick={() => { fetchChat(chat_id); }}
                sx={{ position: 'absolute', top: 10, right: 10, fontSize: 8 }}>
                     {loader?<CircularProgress size={15} sx={{color:'white'}}/>:'Reload' }
                     </Button> 
        </div>

    )
}