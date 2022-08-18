import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupChatItem from '../../../components/sidebar-item/GroupChatItem';
import IndexedDb from '../../../databse'




export default function GroupList() {

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [recentItems, setRecentItems] = useState([])


  useEffect(() => {
    fetchDBGroupChats()
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const fetchDBGroupChats = async () => {
    try {
      let data = await IndexedDb.getAllChat();
      let temp = []
      data.forEach(element => {
        if (element.isgroupchat) {
          temp.push(element)
        }
      });
      setRecentItems(temp)
    } catch (e) {
    }
  }


  return (
    <Grid container sx={{ height: '100%' }} direction={'column'}>
      <div style={{
        height: windowSize.innerWidth < 900 ? (windowSize.innerHeight - 106) : (windowSize.innerHeight - 150),
        overflowY: 'scroll'
      }}>
        {
          recentItems.map((e, i) => <GroupChatItem key={i} element={e} position={i} />)
        }
      </div>
    </Grid>
  )
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}