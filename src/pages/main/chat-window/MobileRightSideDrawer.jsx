import React, { Component } from 'react'
import { Drawer } from '@mui/material'
import ICONS from '../../../constants/Icons'
import SideBar from '../side-bar'




export default function MobileRightSideDrawer() {

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    return (
        <React.Fragment key={'right'}>
            <ICONS.CHAT_MENU
                style={{ marginLeft: 5 }} color={'white'} onClick={() => {
                    setDrawerOpen(!drawerOpen)
                }} />

            <Drawer
                anchor={'right'}
                open={drawerOpen}
                onClose={() => { setDrawerOpen(!drawerOpen) }}>

                <SideBar />

            </Drawer>
        </React.Fragment>
    )
}