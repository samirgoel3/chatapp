import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TechDescriptionView from '../../components/tech-description'
import ICONS from '../../constants/Icons'
import ROUTESNAMES from '../../constants/RoutesName'
import './login.css'


export default function Login() {


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
                    <TextField label="Email" variant="outlined" placeholder='Enter you email' sx={{ width: '100%', marginBottom: 2, fontWeight: 700 }} />

                    <FormControl className='form-controller' variant="outlined">
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
                    <div className='button-container'>
                    <Button variant='contained' className='login-button'> Login</Button>
                    </div>
                    <div className='signup-container' >
                        Don't have account?
                        <Link className='signup-text' to={ROUTESNAMES.SIGN_UP}> Sign up</Link>
                    </div>


                </div>

            </div>




            {/* <Grid container className='left-root'>

                   

                </Grid> */}


        </div>
    )
}