import { Grid, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllUserItem from '../../../components/sidebar-item/AllUserItem';
import Services from '../../../network/services';
import { actions } from '../../../states/actions';


const mock = ["", "", "", "", "", "", "", ""]


export default function AllUserList() {

  const stateData = useSelector(state => state)
  const dispatch = useDispatch()
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [loader, setLoader] = React.useState(false)
  const [users, setusers] = React.useState([])

  useEffect(() => {
    fetchAllUsers();

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

  }, []);


  const fetchAllUsers = async () => {
    try {
      setLoader(true)
      const data = await Services.AuthenticationService.getAllUsers()
      setLoader(false)
      if (!data) {
        dispatch(actions.ErrorDialogActions.showNoDataFromApi())
      } else {
        if (data.data.result === 1) {
          setusers(data.data.response)
        }
        else {
          dispatch(actions.ErrorDialogActions.showError({ header: "Failed To fetch All Users", description: "" + data.data.message }))

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
        {loader ? <LinearProgress sx={{width:'100%'}} /> : null }
        {
          users.map((e, i) => <AllUserItem element={e} position={i} />)
        }
      </div>
    </Grid>
  )
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}