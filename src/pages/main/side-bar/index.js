import { Grid } from '@mui/material';
import React from 'react';
import COLORS from '../../../constants/Colors';
import GroupList from './GroupsList';
import RecentChat from './RecentChatList';
import SearchBar from './Searchbar';
import TabsBar from './TabsBar';
import SearchedList from './SearchedList';


export default function SideBar() {

    const [selectedTab, setSelectedtab] = React.useState(0)
    const [searchedResult, setSearchedResult] = React.useState([])
    const [searchedError, setSearchedError] = React.useState(null)

    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>


            <Grid item sx={{ width: '100%' }}>
                <TabsBar onTabSelected={(tabPosition) => { setSelectedtab(tabPosition) }} />
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                <SearchBar addGroupVisibility={selectedTab == 1} onSearchedResult={(data) => { setSearchedResult(data); setSearchedError(null); }}  onSearchError={(err)=>{
                     setSearchedError(err)  
                }}/>
            </Grid>


            <Grid item flex={1} >

                {searchedResult.length > 0 || searchedError != null ?
                    <SearchedList searchedData={searchedResult} error={searchedError}/> :
                    selectedTab == 0 ? <RecentChat /> :<GroupList />
                }


            </Grid>
        </Grid>
    )
}
