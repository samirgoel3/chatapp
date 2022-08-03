import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../../constants/Colors';
import GroupList from './GroupsList';
import RecentChat from './RecentChatList';
import SearchBar from './Searchbar';
import SearchedList from './SearchedList';
import TabsBar from './TabsBar';
import AllUserList from './AllUsersList';


    
    



export default function SideBar({onElementSelected}) {

    const [selectedTab, setSelectedtab] = React.useState(0)
    const [searchedResult, setSearchedResult] = React.useState([])
    const [searchedError, setSearchedError] = React.useState(null)
    const [loader, setLoader] = React.useState(false);

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    const handleOnelementSelectedOnSearchedList = (element) => {
        setSearchedResult([])
        setSearchedError(null)
        onElementSelected(element)
    }

   



    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'}  sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>
            <Grid item sx={{ width: '100%' }}>
                <TabsBar onTabSelected={(tabPosition) => { setSelectedtab(tabPosition) }} />
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                <SearchBar
                    addGroupVisibility={selectedTab == 1}
                    onSearchedResult={(data) => { setSearchedResult(data); setSearchedError(null); }}
                    onSearchError={(err) => { setSearchedError(err) }}
                />
            </Grid>


            <Grid item flex={1} >

                {searchedResult.length > 0 || searchedError != null ?
                    <SearchedList
                        searchedData={searchedResult}
                        error={searchedError}
                        onElementSelected={(element) => { handleOnelementSelectedOnSearchedList(element) }}
                    /> :
                    selectedTab == 0 ? <RecentChat /> : 
                    selectedTab == 1 ? <GroupList />: <AllUserList/>
                }


            </Grid>
        </Grid>
    )
}
