import { Grid } from '@mui/material';
import React from 'react';
import COLORS from '../../../constants/Colors';
import GroupList from './GroupsList';
import RecentChat from './RecentChatList';
import SearchBar from './Searchbar';
import TabsBar from './TabsBar';


export default function SideBar() {

    const [selectedTab, setSelectedtab] = React.useState(0)

    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>


            <Grid item sx={{ width: '100%' }}>
                <TabsBar onTabSelected={(tabPosition) => { setSelectedtab(tabPosition) }} />
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                <SearchBar addGroupVisibility={selectedTab == 1} />
            </Grid>

            <Grid item flex={1} >
                {selectedTab == 0 ?
                    <RecentChat /> : 
                    <GroupList />
                }

            </Grid>
        </Grid>
    )
}
