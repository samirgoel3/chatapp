import React from 'react'
import { Grid, Paper, TextField, Typography, InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import COLORS from '../../constants/Colors'
import ICONS from '../../constants/Icons'
import ROUTESNAMES from '../../constants/RoutesName'
import Concepts from '../../constants/DevConcepts'
import './login.css';

export default function Login() {


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

                        <TextField label="Email" variant="outlined" placeholder='Enter you email' sx={{ width: '100%', marginBottom: 4, fontWeight: 700 }} />


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

                        <Button variant='contained' sx={{ width: '100%' }}> Login</Button>
                        <div className='signup-container' >
                            Don't have account?
                            <Link className='signup-text' to={ROUTESNAMES.SIGN_UP}> Sign up</Link>
                            here
                        </div>

                        <ICONS.NODE size={40} color={COLORS.PRIMARY} />
                        <ICONS.GITHUB size={40} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />
                        <ICONS.MONGO_DB size={40} color={COLORS.PRIMARY} style={{ marginLeft: 5 }} />


                    </Paper>


                </Grid>
            </Grid>

            {/* RIGHT */}
            <Grid item flex={1} sx={{ backgroundColor: COLORS.PRIMARY, textAlign: 'center', paddingTop: 30 }} >
               
                    { Concepts.map((e)=>{
                         return <Typography sx={{ color: 'white' }}> {e.detail}</Typography>
                    })}
                    
            </Grid>



        </Grid>
    )
}