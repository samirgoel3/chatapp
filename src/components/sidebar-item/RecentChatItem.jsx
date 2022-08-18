import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../constants/Colors';
import Storage from '../../storage';
import DateAndTimeUtil from '../../utils/DateAndTimeUtil';
import { dispatch as busDispatch } from 'use-bus'
import { actions } from '../../states/actions';



export default function RecentChatItem({ element, position }) {

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    const getOtherUserimage = (userData) => {
        if (userData[0]._id == Storage.Session.getUserData()._id) {
            return userData[1].image
        }
        else { return userData[0].image }
    }

    const getTotalnoOfUnreadMessages = () => {
        let unreadMessages = [];
        element.messages.forEach((ele) => {
            if (!ele.readby.some(obj => obj._id == Storage.Session.getUserData()._id)) {
                unreadMessages.push(ele)
            }
        })
        return unreadMessages;
    }

    return (
        <Grid item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 60, width: '100%', backgroundColor: element.chat_id != stateData.selectorData.selected_one_to_one_chat ?  COLORS.PRIMARY_LIGHT: COLORS.TEAL_A700, position: 'relative' }}
            direction={'row'} onClick={() => {
                if (element.chat_id != stateData.selectorData.selected_one_to_one_chat) {
                    dispatch(actions.SelectorAction.selectOneToOneChat(element.chat_id))
                    busDispatch('REFRESH_RECENT_CHATS')
                    busDispatch('CLOSE_DRAWER')
                }
            }}>
            <Avatar sx={{ width: 40, height: 40 }} src={getOtherUserimage(element.users)} />
            <Grid container direction={'column'} sx={{ marginLeft: 1 }} >
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{element.chatname}</Typography>
                <Grid container justifyContent={'center'} alignItems={'center'} direction={'row'}>
                    <Grid item flex={1}>
                        <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 10, paddingRight: 1, maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {element.messages.length == 0 ? "- - - -" : element.messages[element.messages.length - 1].content.message}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {element.messages.length == 0 ? null :
                            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 9 }}>
                                {DateAndTimeUtil.convertMongoDbTimestampToDate(element.messages[element.messages.length - 1].createdAt, 'ddd hh:mm A')}
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </Grid>
            {
                getTotalnoOfUnreadMessages() == 0 ? null :
                    <Typography sx={{ position: 'absolute', right: 5, padding: '3px 5px', top: 10, backgroundColor: 'red', borderRadius: 40, color: 'white', fontWeight: 700, fontSize: 10 }}>
                        {getTotalnoOfUnreadMessages().length}
                    </Typography>
            }


        </Grid>
    )
}