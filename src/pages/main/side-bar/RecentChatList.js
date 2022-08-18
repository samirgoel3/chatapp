import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RecentChatItem from '../../../components/sidebar-item/RecentChatItem';
import IndexedDb from '../../../databse';
import useBus from 'use-bus'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../states/actions';



export default function RecentChat() {

    const [windowSize, setWindowSize] = useState(getWindowSize())
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        fetchDBOneToOneChats();

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const fetchDBOneToOneChats = async () => {
        try {
            let data = await IndexedDb.getAllChat();
            let temp = []
            data.forEach(element => {
                if (!element.isgroupchat) {
                    temp.push(element)
                }
            });
            dispatch(actions.ChatActions.setRecentChat(temp))
        } catch (e) {
            
        }

    }

    useBus('REFRESH_RECENT_CHATS', (data) => {
        fetchDBOneToOneChats()
    })


    return (
        <Grid container sx={{ height: '100%' }} direction={'column'}>
             <div style={{
                    height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 69) : (windowSize.innerHeight - 120),
                    overflowY: 'scroll'
                }}>
                    {
                        stateData.chatData.recent_chat.length == 0 ?
                            <Grid container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
                                <Typography style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>NO RECENT CHATS </Typography>
                                <Typography style={{ color: 'white', fontWeight: 400, fontSize: 12 }}>You can search user to initiate chat</Typography>
                                <Button variant='contained' sx={{ margin: 1, width: 200 }}>Search User</Button>
                            </Grid>
                            :
                            stateData.chatData.recent_chat.map((e, i) => <RecentChatItem element={e} position={i} />)

                    }
                </div>
        </Grid>
    )
}

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}