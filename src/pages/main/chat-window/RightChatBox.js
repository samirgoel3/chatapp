import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { faker } from '@faker-js/faker'
import COLORS from '../../../constants/Colors'
const sampleMessage = "Lorem Iptop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


export default function RightChatBox() {
    return (
        <div style={{ padding: 5, display: 'flex', maxWidth: '65%', display: 'flex', flexDirection: 'row', alignSelf:'flex-end' }}>
            <div style={{ marginRight: 10 }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#333', textAlign:'end' }}>{faker.name.findName()}</Typography>
                <Typography sx={{ backgroundColor: COLORS.TEAL_200, padding: 1, fontSize: 10, borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 3 }}>{sampleMessage}</Typography>
            </div>
            <Avatar style={{ width: 30, height: 30 }} src={faker.image.avatar()} />
        </div>
    )
}