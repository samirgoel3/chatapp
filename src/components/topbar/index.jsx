import { Button, Grid } from '@mui/material';
import React from 'react';
import ICONS from '../../constants/Icons';
import Services from '../../network/services';
import AppLogo from './AppLogo';
import ConceptsUsedInSite from './ConceptsUsedInSite';
import MobileSideDrawerLeft from './MobileLeftSideDrawer';
import MyInfo from './MyInfo';
import './topbar.css';
import UserInfo from './UserInfo';
import { actions } from '../../states/actions/index';
import { useDispatch } from 'react-redux';


const TopBar = ({ children }) => {

  const [loadingReadMessage, setLoadinReadMessage] = React.useState(false)
  const [loadingUnReadMessage, setLoadinUnReadMessage] = React.useState(false)
  const dispatch = useDispatch()

  const fetchChatWithReadMessage = async () => {
    try {
      setLoadinReadMessage(true)
      const data = await Services.ChatService.getChatWithReadMessages()
      setLoadinReadMessage(false)
      if (!data) {
        dispatch(actions.ErrorDialogActions.showNoDataFromApi())
      } else {
        if (data.data.result === 1) {
          dispatch(actions.RecentChatActions.setInitialChats(data.data.response))
          if (data.data.response.one_to_one_chat.length > 0) {
            dispatch(actions.RecentChatActions.setSelectedPosition(0))
            dispatch(actions.RecentChatActions.setSelectedChat(data.data.response.one_to_one_chat[0]))
            dispatch(actions.MessagesActions.setMessages([data.data.response.one_to_one_chat[0].last_message])) 
          } else {
          }
        }
        else {
          // no recent chat available
        }
      }
    } catch (e) {
      setLoadinReadMessage(false)
      dispatch(actions.ErrorDialogActions.showException(e.message))
    }

  }

  const fetchChatWithUnReadMessage = async () => {
    try {
      setLoadinUnReadMessage(true)
      const data = await Services.ChatService.getChatWithUnReadMessages()
      setLoadinUnReadMessage(false)
      if (!data) {
        dispatch(actions.ErrorDialogActions.showNoDataFromApi())
      } else {
        if (data.data.result === 1) {
          dispatch(actions.RecentChatActions.addUnreadChat(data.data.response))
          if (data.data.response.one_to_one_chat.length > 0) {
            dispatch(actions.RecentChatActions.setSelectedPosition(0))
            dispatch(actions.RecentChatActions.setSelectedChat(data.data.response.one_to_one_chat[0]))
            dispatch(actions.MessagesActions.setMessages([data.data.response.one_to_one_chat[0].last_message])) 
          } else {
          }
        }
        else {
          // no recent chat available
        }
      }
    } catch (e) {
      setLoadinUnReadMessage(false)
      dispatch(actions.ErrorDialogActions.showException(e.message))
    }

  }


  return (

    <Grid container direction={'column'} >

      {/* Top Bar */}
      <Grid container className='root-top-bar'>
        <Grid item display={{ xl: 'none', lg: 'none', md: 'none', sm: 'block', xs: 'block' }}>
          <MobileSideDrawerLeft />
        </Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'block', xs: 'block' }}><AppLogo /></Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' }}><MyInfo /></Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' }}> <ConceptsUsedInSite /></Grid>

        <div style={{ display: 'flex', flex: 1 }} />
        <Button variant='outlined' sx={{ color: 'white', fontSize: 10, fontWeight: 700 }} onClick={() => { fetchChatWithReadMessage() }}> {loadingReadMessage?'Loading':'Read Messages'}</Button>
        <Button variant='outlined' sx={{ color: 'white', fontSize: 10, fontWeight: 700 }} onClick={() => { fetchChatWithUnReadMessage() }}>{loadingUnReadMessage?'Loadin':'Unread Messages'}</Button>
        <Button variant='outlined' sx={{ color: 'white', fontSize: 10, fontWeight: 700 }} onClick={() => { localStorage.clear(); window.location.reload(false); }}> Logout</Button>
        <div style={{ paddingRight: 12 }}> <UserInfo /> </div>


      </Grid>


      {/* Main Content Area */}
      <Grid flex={1} >
        {children}
      </Grid>



    </Grid>

  );
};

export default TopBar;