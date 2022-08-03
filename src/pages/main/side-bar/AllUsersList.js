import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RecentChatItem from '../../../components/sidebar-item/RecentChatItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../states/actions';
import AllUserItem from '../../../components/sidebar-item/AllUserItem';


const mock = ["","","","","","","",""]


export default function AllUserList() {

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()
    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);


    return (
        <Grid container sx={{ height: '100%' }} direction={'column'}>
            <div style={{ height: windowSize.innerWidth < 900 ?(windowSize.innerHeight - 105): (windowSize.innerHeight - 156), overflowY: 'scroll' }}>
                {
                    mock.map((e, i)=> <AllUserItem element={e} position={i}/>)
                }
            </div>
        </Grid>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }