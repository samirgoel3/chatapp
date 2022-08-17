import { Grid, LinearProgress, Typography, Button, Avatar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import COLORS from '../../constants/Colors'
import Session from '../../storage/Session'
import ROUTESNAMES from '../../constants/RoutesName';
import { useDispatch } from 'react-redux'
import { actions } from '../../states/actions/index';
import Services from '../../network/services'
import Localbase from 'localbase'






export default function MessageLoader() {

    let navigate = useNavigate();
    const [loadingMessage, setLoadingMessage] = React.useState("")
    let dispatch = useDispatch()
    let db = new Localbase('chat-db')
    let chats = [];

    React.useEffect(() => {
        fetchAllChats();
    }, [])


    const fetchAllChats = async () => {
        try {
            setLoadingMessage('Loading Chats')
            const data = await Services.ChatService.getAllChatsWithoutMessages()
            if (!data) {
                setLoadingMessage('API Causing Error while fetching chats')
            } else {
                if (data.data.result === 1) {
                    setLoadingMessage(data.data.response.length + ' Chats Found successfully')
                    chats = data.data.response;
                    for(var i=0 ; i < chats.length ; i++){
                        let messages = await fetchMessagesbyChatId(chats[i])
                        saveDataIndb(chats[i], messages)
                        if(i == chats.length -1){
                            setLoadingMessage('Chats Loaded completely')
                            setTimeout(()=>{
                                navigate("" + ROUTESNAMES.MAIN, { replace: true });
                            }, 2000)
                        }
                    }                    
                }
                else {
                    setLoadingMessage('No Chats Found')
                }
            }
        } catch (e) {
            dispatch(actions.ErrorDialogActions.showException(e.message))
            setLoadingMessage(''+e.message)
        }
    }


    const fetchMessagesbyChatId = async (chatData)=>{
        try {
            setLoadingMessage('Fetching chat: ' +chatData.chatname)
            const data = await Services.MessageService.getAllMessagesByChatId(chatData._id)
            if (!data) {
                setLoadingMessage('API Causing Error while fetching messages')
                return [];
            } else {
                return data.data.response;
            }
        } catch (e) {
            setLoadingMessage(e.message)
            return[]
        }
    }

    const saveDataIndb = async (chatData, messages)=>{
        await db.collection('chats').add({
            chat_id: chatData._id,
            chatname: chatData.chatname,
            isgroupchat: chatData.isgroupchat,
            users: chatData.users,
            groupadmin: chatData.groupadmin,
            createdAt: chatData.createdAt,
            identifier:"create it by sorting",
            messages:messages
        }, ""+chatData._id)
    }




    return (
        <Grid
            container
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
            sx={{ width: '100%', height: '100%', backgroundColor: COLORS.PRIMARY_DARK, position: 'absolute', left: 0, overflow: 'hidden' }}
        >
            {Session.getUserData() != null ?
                <>
                    <Avatar sx={{width:180, height:180,margin:2}} src={Session.getUserData().image}/>
                    <Typography variant='h5' color={'white'}>LOADING YOUR CHATS</Typography>
                    <Typography fontSize={12} color={'white'}>Please do not close this page until message is loading</Typography>
                    <LinearProgress sx={{ width: 300, margin: 2 }} />
                    <Typography fontSize={11} color={'white'}>{loadingMessage}</Typography>
                </>
                :
                <>
                    <Typography variant='h5' color={'white'}>Unable to load Chats</Typography>
                    <Typography fontSize={12} color={'white'}>Please Login your accoun in order reload this page</Typography>
                    <Button variant='contained' sx={{ width: '80%', marginTop: 2 }} onClick={() => { navigate(ROUTESNAMES.LOGIN) }}>Login</Button>
                </>
            }



        </Grid>
    )
}