import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component, useEffect, useState } from 'react'
import COLORS from '../../../constants/Colors'
import { faker } from '@faker-js/faker';





const getMockData = () => {
    faker.seed(323)
    let requirement = 3;
    let arr = [];
    for (let i = 0; i < requirement; i++) {
        arr.push(
            {
                image: i == 1 ? faker.image.cats() : i == 2 ? faker.image.animals() : i == 3 ? faker.image.avatar() : i == 4 ? faker.image.business() : faker.image.city(),
                username: faker.name.firstName() + " " + faker.name.lastName(),
                recent_message: "Some user name will goes here accordingly",
                message_time: ""
            }
        )
    }

    return arr;
}

const getRecentChatListItem = (element, index) => {
    return (
        <Grid item sx={{ display: 'flex', padding: '0px 7px', justifyContent: 'flex-start', alignItems: 'center', height: 60, width: '100%', backgroundColor: index== 1?COLORS.PRIMARY_DARK:COLORS.PRIMARY_LIGHT }}
            direction={'row'} >
            <Avatar sx={{ width: 40, height: 40 }} src={element.image} />
            <Grid container direction={'column'} sx={{ marginLeft: 1 }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{element.username}</Typography>
                <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 10 }}> last message that user has send to the chat</Typography>
            </Grid>
        </Grid>
    )
}


export default function RecentChat() {
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
                    getMockData().map((e, i) => {
                        return (
                            getRecentChatListItem(e, i)
                        )
                    })
                }

            </div>

        </Grid>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }