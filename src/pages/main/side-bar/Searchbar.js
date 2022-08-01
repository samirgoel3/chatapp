import { Button, Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import ICONS from '../../../constants/Icons';
import CircularProgress from '@mui/material/CircularProgress';
import Services from '../../../network/services';
import { useDispatch } from 'react-redux'
import { actions } from '../../../states/actions'


export default function SearchBar({ addGroupVisibility, onSearchedResult, onSearchError }) {

    const dispatch = useDispatch()
    const [loader, setLoader] = React.useState(false)
    let debounceTimer;


    const fetchSearchApi = async (key) => {
        try {
            setLoader(true)
            const data = await Services.AuthenticationService.getSearchUsers(key)
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    onSearchedResult(data.data.response)
                }
                else {
                    onSearchError(data.data.message)
                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }



    const debouncer = function (value) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() =>  fetchSearchApi(value), 500);
      }

      
    const onHandleSearch = (value)=>{
        if(value){debouncer(value)}
        else{ onSearchedResult([])}
        
    }





    return (
        <Grid container flexDirection={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} padding={1}>
            <Grid item flex={1}>
                <Paper sx={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', paddingLeft: 1, paddingRight: 1 }}>
                    <TextField variant='standard' placeholder='Search User' sx={{ flex: 1 }} InputProps={{ disableUnderline: true }} onChange={(e)=>{ onHandleSearch(e.target.value) }}/>
                     { loader ?  <CircularProgress size={15} sx={{ marginInline: 1 }} /> : null}
                    <ICONS.SEARCH color='#bbb' />
                </Paper>
            </Grid>

            <Grid item>
                {
                    addGroupVisibility ?
                        <Button variant='contained' sx={{ fontSize: 13, paddingInline: 1, fontWeight: 700, borderRadius:1, height:40 }}>Create Group</Button> :
                        null
                }
            </Grid>


        </Grid>
    )
}