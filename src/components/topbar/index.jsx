import { Grid } from '@mui/material';
import React from 'react';
import ICONS from '../../constants/Icons';
import AppLogo from './AppLogo';
import ConceptsUsedInSite from './ConceptsUsedInSite';
import MobileSideDrawerLeft from './MobileLeftSideDrawer';
import MyInfo from './MyInfo';
import './topbar.css';
import UserInfo from './UserInfo';


const TopBar = ({ children }) => {

  return (

    <Grid container direction={'column'} >

      {/* Top Bar */}
      <Grid container className='root-top-bar'>
        <Grid item display={{ xl: 'none', lg: 'none', md: 'none', sm: 'block', xs: 'block' }}>
          <MobileSideDrawerLeft />
        </Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'block', xs: 'block' }}><AppLogo /></Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' }}><MyInfo /></Grid>
        <Grid item  display={{ xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' }}> <ConceptsUsedInSite /></Grid>

        <div style={{ display: 'flex', flex: 1 }} />
        <div style={{ paddingRight:12}}> <UserInfo /> </div>
        

      </Grid>


      {/* Main Content Area */}
      <Grid flex={1} >
        {children}
      </Grid>



    </Grid>

  );
};

export default TopBar;