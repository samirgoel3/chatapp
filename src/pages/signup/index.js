import React from 'react'
import { Grid, Paper, TextField, Typography, InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton, Button, Switch } from '@mui/material'
import { Link } from 'react-router-dom'
import COLORS from '../../constants/Colors'
import ICONS from '../../constants/Icons'
import Concepts from '../../constants/DevConcepts'
import ROUTESNAMES from '../../constants/RoutesName'
import './signup.css';

export default function SignUp() {


    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const handlePasswordChange = (value) => {
        setPassword(value)
    }


    return (
        <Grid container className='root'>

            {/* LEFt */}
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Grid container className='left-root'>

                    <Paper className='paper'>
                        <Typography variant='h4' sx={{ fontWeight: 700, marginBottom: 3, color: COLORS.PRIMARY }}>Chat APP Sample</Typography>
                        <Typography variant='subtitle2' sx={{ marginBottom: 3, color: '#bbb' }}>A simple chat app project created using socket, React, express, Node as backend, Material UI with open source code</Typography>

                        <div className='username-container'>
                            <div className='user-image'>
                                <ICONS.CAMERA  size={20} color={'white'}/>
                            </div>
                            <TextField
                                label="User Name"
                                variant="outlined"
                                placeholder='Enter your name here'
                                sx={{ flex: 1, width: '100%' }} />

                        </div>
                        <TextField label="Email" variant="outlined" placeholder='Enter you email' sx={{ width: '100%', marginBottom: 4 }} />


                        <FormControl sx={{ marginBottom: 2, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" sx={{ fontWeight: 700 }}>Password</InputLabel>
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
                            <Switch/>
                        </Grid>

                        <Button variant='contained' sx={{ width: '100%' }}>Create Account</Button>
                        <div className='signup-container' >
                            Already have account? <Link className='login-text' to={ROUTESNAMES.LOGIN}> Login</Link>
                        </div>

                        <ICONS.NODE size={30} color={COLORS.PRIMARY} />
                        <ICONS.GITHUB size={30} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.MONGO_DB size={30} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.REACT size={30} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        
                    </Paper>


                </Grid>
            </Grid>

            {/* RIGHT */}
            <Grid item flex={1} sx={{ backgroundColor: COLORS.PRIMARY, textAlign: 'center', paddingTop: 30 }} >

                {Concepts.map((e) => {
                    return <Typography sx={{ color: 'white' }}> {e.detail}</Typography>
                })}

            </Grid>




        </Grid>
    )
}