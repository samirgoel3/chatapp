import React, { Component } from 'react'
import { Grid, TextField } from '@mui/material';
import ICONS from '../../../../../constants/Icons';
import COLORS from '../../../../../constants/Colors';
import Services from '../../../../../network/services';
import { actions } from '../../../../../states/actions/index';
import { useDispatch } from 'react-redux'





export default function ChatInput({chatData}){

    const [input, setInput] = React.useState("")
    const dispatch = useDispatch()
    const [loader, setLoader] = React.useState(false)


    const onMessageHandle = ()=>{
        if(input){
            fetchMessageSend(input); 
            setInput("")
        }else{
            alert('right some message')
        }
    }

    const fetchMessageSend = async (message) => {
        try {
            setLoader(true)
            const data = await Services.MessageService.getSendMessage(chatData.chat_id, message)
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    // alert(JSON.stringify(data.data))
                }
                else {
                    dispatch(actions.ErrorDialogActions.showError({ header: "Failed To login", description: "" + data.data.message }))

                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }



    return (
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
            value={input}
            onChange={(e) => { setInput(e.target.value)}}
            InputProps={{ disableUnderline: true, style: { fontSize: 12, minHeight: 47 } }}
            sx={{ display: 'flex', flex: 1, marginRight: 1, backgroundColor: 'white', borderRadius: 10, paddingInline: 3 }} />
        <div style={{ backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 7 }}>
            <ICONS.SEND_MESSAGE style={{ width: 25, height: 25, color: COLORS.PRIMARY }} onClick={() => {
                 onMessageHandle()
            }} />
        </div>
    </Grid>
    )
}