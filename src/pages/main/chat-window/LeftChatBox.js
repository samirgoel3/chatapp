import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { faker } from '@faker-js/faker'
import COLORS from '../../../constants/Colors'
const sampleMessage = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


export default function LeftChatBox() {
    return (
        <div style={{ padding: 5, display: 'flex', maxWidth: '65%', display: 'flex', flexDirection: 'row' }}>
            <Avatar style={{ width: 30, height: 30 }} src={faker.image.avatar()} />
            <div style={{ marginLeft: 5 }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#333' }}>{faker.name.findName()}</Typography>
                <Typography sx={{ backgroundColor: COLORS.TEAL_100, padding: 1, fontSize: 10, borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 3 }}>{sampleMessage}</Typography>
            </div>
        </div>
    )
}