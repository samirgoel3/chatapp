import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupChatItem from '../../../components/sidebar-item/GroupChatItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../states/actions';
import Services from '../../../network/services/index';




export default function GroupList() {

  const [loader, setLoader] = React.useState(false)
  const stateData = useSelector(state => state)
  const dispatch = useDispatch()
  const [windowSize, setWindowSize] = useState(getWindowSize())

  useEffect(() => {
    fetchChatgroups()
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const fetchChatgroups = async () => {
    try {
      setLoader(true)
      const data = await Services.ChatService.getChatGroups()
      setLoader(false)
      if (!data) {
        dispatch(actions.ErrorDialogActions.showNoDataFromApi())
      } else {
        if (data.data.result === 1) {
          dispatch(actions.RecentChatActions.setGroups(data.data.response))
        }
        else {
          // no groups found
        }
      }
    } catch (e) {
      setLoader(false)
      dispatch(actions.ErrorDialogActions.showException(e.message))
    }
  }


  return (
    <Grid container sx={{ height: '100%' }} direction={'column'}>
      <div style={{ height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 105) : (windowSize.innerHeight - 156), overflowY: 'scroll' }}>
        {
          stateData.recentChatData.groups.map((e, i) => <GroupChatItem  key={i} element={e} position={i} />)
        }
      </div>
    </Grid>
  )
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}