import { Avatar, Typography, Popover, Grid, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import COLORS from '../../../../../constants/Colors'
import ICONS from '../../../../../constants/Icons';
import Services from '../../../../../network/services';
import Storage from '../../../../../storage';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../../../states/actions/index';



export default function LeftChatBox({ data }) {

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchMarkMessageAsRead = async () => {
            try {
                const result = await Services.MessageService.getMarkMessageAsRead(data._id)
                if (!result) {
                    dispatch(actions.ErrorDialogActions.showNoDataFromApi())
                } else {
                    if (result.data.result === 1) {
                        // console.log('********** '+result.data.message)
                    }
                }
            } catch (e) {
                dispatch(actions.ErrorDialogActions.showException(e.message))
            }
    }

    useEffect(()=>{
        let isAlreadyRead = data.readby.some((el)=>{ return el._id == Storage.Session.getUserData()._id})
        if(!isAlreadyRead){ fetchMarkMessageAsRead()}
    }, [])

    return (
        <div style={{ padding: 5, display: 'flex', maxWidth: '65%', display: 'flex', flexDirection: 'row', alignSelf: 'flex-start' }}>
            <Avatar style={{ width: 30, height: 30 }} src={data.sender.image} />
            <div style={{ marginLeft: 5 }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#333' }}>{data.sender.username}</Typography>
                <Typography sx={{ backgroundColor: COLORS.TEAL_100, padding: 1, fontSize: 12, borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 3 }}>
                    {data.content.message}
                    <Grid container alignItems={'center'} sx={{ marginTop: 1 }} justifyContent={'center'}>
                        <Grid item flex={1}>
                            <Typography sx={{ fontSize: 8, fontWeight: 700, color: COLORS.PRIMARY_DARK }} textAlign={'left'}>{data.createdAt}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-describedby={id} onClick={handleClick} >
                                <ICONS.OPEN_EYE_ICON style={{ width: 13, height: 13 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Typography>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div style={{ padding: 4 }}>
                        <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#333', marginBottom: 1 }}>Read By</Typography>
                        {
                            data.readby.map((e, i) => {
                                return <Grid container direction={'row'} sx={{marginBottom:1}}>
                                    <Grid item> <Avatar src={e.image} sx={{ width: 15, height: 15, marginRight: 1 }} /> </Grid>
                                    <Grid item> <Typography sx={{ fontSize: 9 }}>{e.username}</Typography> </Grid>
                                </Grid>
                            })
                        }
                    </div>
                </Popover>

            </div>
        </div>
    )
}