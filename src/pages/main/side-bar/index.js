import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../../constants/Colors';
import Services from '../../../network/services';
import AllUserList from './AllUsersList';
import CreateChatView from './CreateChatView';
import GroupList from './GroupsList';
import RecentChat from './RecentChatList';
import SearchBar from './Searchbar';
import SearchedList from './SearchedList';
import TabsBar from './TabsBar';
import { actions } from '../../../states/actions/index';
import Storage from '../../../storage';
import _ from 'lodash'
import { dispatch as busDispatch } from 'use-bus'
import useBus from 'use-bus'



export default function SideBar() {

    const [selectedTab, setSelectedtab] = React.useState(0)
    const [searchedResult, setSearchedResult] = React.useState([])
    const [searchedError, setSearchedError] = React.useState(null)
    const [loader, setLoader] = React.useState(false);

    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    useBus('SELECT-FIRST-TAB',(data)=>{
         setSelectedtab(0)
         handleOnelementSelectedOnSearchedList(data.payload.element, data.payload.recent_chats)
        })

    const handleOnelementSelectedOnSearchedList = (element, recent_chats) => {
        setSearchedResult([])
        setSearchedError(null)


        // check weather this already exist in recent chat or not
        // If not exist then add view in side indicating creating chat
        // if already exist then shift that element to top in redux store in recent chat and selected position is 0
        let elementToEquate = [Storage.Session.getUserData()._id, element._id]
        let positionOfExistingRecentitem = -1;
        recent_chats.forEach((recent_elements, index) => {
            let innerArray = [];
            
            recent_elements.users.forEach((e, i) => {
                innerArray.push(e._id)
            })

           
            if (_.isEqual(innerArray, elementToEquate) || _.isEqual(innerArray, elementToEquate.reverse())) {
                positionOfExistingRecentitem = index;

            }
        });
        dispatch(actions.MessagesActions.removeAllMessages())

        

        if (positionOfExistingRecentitem == -1) {
             fetchCreateChat(element) 
            }
        else {
            dispatch(actions.RecentChatActions.setSelectedPosition(positionOfExistingRecentitem))
            dispatch(actions.RecentChatActions.setSelectedChat( recent_chats[positionOfExistingRecentitem]))
            dispatch(actions.MessagesActions.setMessages(recent_chats[positionOfExistingRecentitem].last_message == null ? [] : [recent_chats[positionOfExistingRecentitem].last_message]))
            busDispatch('CLOSE_DRAWER')
        }
    }

    const fetchCreateChat = async (element) => {

        
        try {
            setLoader(true)
            const data = await Services.ChatService.getCreateChat("" + Storage.Session.getUserData().username + "-" + element.username, "" + element._id)
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    let objectToAddUpdateInRecentChat = {
                        chat_id: "" + data.data.response._id,
                        chatname: "" + element.username,
                        chaticon: "" + element.image,
                        users:data.data.response.users,
                        last_message: null
                    }
                    dispatch(actions.RecentChatActions.addChattoFirstPosition(objectToAddUpdateInRecentChat))
                    busDispatch('CLOSE_DRAWER')
                }
                else {
                    dispatch(actions.ErrorDialogActions.showError({ header: "Failed To Create Chat", description: "" + data.data.message }))

                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
    }




    return (
        <Grid container direction={'column'} width={'100%'} height={'100%'} sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>
            <Grid item sx={{ width: '100%' }}>
                <TabsBar onTabSelected={(tabPosition) => { setSelectedtab(tabPosition) }} position={selectedTab}/>
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                <SearchBar
                    addGroupVisibility={selectedTab == 1}
                    onSearchedResult={(data) => { setSearchedResult(data); setSearchedError(null); }}
                    onSearchError={(err) => { setSearchedError(err) }}
                />
            </Grid>


            <Grid item flex={1} >

                {loader ? <CreateChatView /> : null}

                {searchedResult.length > 0 || searchedError != null ?
                    <SearchedList
                        searchedData={searchedResult}
                        error={searchedError}
                        onElementSelected={(element) => { handleOnelementSelectedOnSearchedList(element, stateData.recentChatData.recent_chats) }}
                    /> :
                    selectedTab == 0 ? <RecentChat /> :
                        selectedTab == 1 ? <GroupList /> : <AllUserList />
                }


            </Grid>
        </Grid>
    )
}
