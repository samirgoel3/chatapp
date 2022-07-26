import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TechDescriptionView from '../../components/common/TechDescriptionView'
import COLORS from '../../constants/Colors'
import ICONS from '../../constants/Icons'
import ROUTESNAMES from '../../constants/RoutesName'
import './signup.css'


export default function SignUp() {


    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const handlePasswordChange = (value) => {
        setPassword(value)
    }


    return (
        <div container
            className='root'
            justifyContent='center' >

            <div className='left-root'>
                <TechDescriptionView />
            </div>

            <div className='right-root'>
                <div className='box-for-content'>

                    <p className='paper-heading'>CHAT APP</p>
                    <p className='paper-subheading'>A simple chat app project created using socket, React, express, Node as backend, Material UI with open source code</p>

                    <div className='username-container'>
                        <div className='user-image'>
                            <ICONS.CAMERA size={20} color={'white'} />
                        </div>
                        <TextField
                            label="User Name"
                            variant="outlined"
                            placeholder='Enter your name here'
                            sx={{ flex: 1, width: '100%' }} />

                    </div>
                    <TextField label="Email" variant="outlined" placeholder='Enter you email' sx={{ width: '100%', marginBottom: 4 }} />

                    <FormControl sx={{ marginBottom: 2, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { handlePasswordChange(e.target.value) }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setShowPassword(!showPassword) }}
                                        edge="end">
                                        {showPassword ? <ICONS.OPEN_EYE_ICON /> : <ICONS.CLOSE_EYE_ICON />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>


                    <Grid container className='dev-container'>
                        <Typography flex={1} fontWeight={600}>Are you a developer?</Typography>
                        <Switch />
                    </Grid>


                    <Button variant='contained' sx={{ width: '100%' }}>Create Account</Button>
                    <div className='signup-container' >
                        Already have account? <Link className='login-text' to={ROUTESNAMES.LOGIN}> Login</Link>
                    </div>

                    <div className='icon-container'>
                        <ICONS.NODE size={20} color={COLORS.PRIMARY} />
                        <ICONS.GITHUB size={20} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.MONGO_DB size={20} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.REACT size={20} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.SOCKETIO size={20} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.POSTMAN size={20} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                    </div>

                </div>

            </div>


        </div>
    )
}
