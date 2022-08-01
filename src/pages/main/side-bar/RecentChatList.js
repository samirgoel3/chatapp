import { faker } from '@faker-js/faker';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SidebarItem from '../../../components/sidebar-item';





const getMockData = () => {
    faker.seed(323)
    let requirement = 13;
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
                    getMockData().map((e, i) => <SidebarItem element={e} position={i}/>)
                }
            </div>
        </Grid>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }