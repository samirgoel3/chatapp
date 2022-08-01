import { Avatar, Button, Grid, Switch, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ErrorInput from '../../components/common/ErrorInput'
import TechDescriptionView from '../../components/tech-description'
import COLORS from '../../constants/Colors'
import ICONS from '../../constants/Icons'
import ROUTESNAMES from '../../constants/RoutesName'
import CameraIcon from '../../images/ic_camera.png'
import './signup.css'


export default function SignUp() {

    const inputRef = React.useRef(null);
    const [inputs, setInputs] = React.useState({ username: '', email: '', password: '' })
    const [error, setError] = React.useState({ username: '', email: "", password: "" })
    const [isDeveloper, setDeveloper] = React.useState(false)
    const [image, setImage] = React.useState(null)

    const handleInputChange = (inputKey, value) => {
        setInputs(prevState => ({ ...prevState, [inputKey]: value }))
        setError(prevState => ({ ...prevState, [inputKey]: "" }))
    }

    function handleError(errorKey, text) {
        setError(prevState => ({ ...prevState, [errorKey]: text }))
    }

    const validate = () => {

        let isValid = true;

        if (!inputs.username) {
            handleError('username', 'Please input username');
            isValid = false;
        }

        if (!inputs.email) {
            handleError('email', 'Please input email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('email', 'Please input a valid email');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('password', 'Please input password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('password', 'Min password length of 5');
            isValid = false;
        }
        if (isValid) {
            alert('Do api fetching work')
        }
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        // setImage(fileObj)
        setImage( URL.createObjectURL(fileObj))

        if (!fileObj) {
            return;
        }

        // 👇️ reset file input
        event.target.value = null;

    };


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
                        <Avatar sx={{ width: 55, height: 55, marginRight: 1, border:'2px solid #00695C' }} src={ image ? image:CameraIcon} onClick={() => { inputRef.current.click(); }} />
                        <ErrorInput label={'User Name'} sx={{ flex: 1, width: '100%' }} error={error.username} value={inputs.username} onChange={(e) => { handleInputChange('username', e.target.value) }} />
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                        />

                    </div>
                    <ErrorInput label={'Email'} sx={{ flex: 1, width: '100%' }} error={error.email} value={inputs.email} onChange={(e) => { handleInputChange('email', e.target.value) }} />
                    <ErrorInput label={'Password'} sx={{ flex: 1, width: '100%' }} type={'password'} error={error.password} value={inputs.password} onChange={(e) => { handleInputChange('password', e.target.value) }} />

                    <Grid container className='dev-container'>
                        <Typography flex={1} fontWeight={600}>Are you a developer?</Typography>
                        <Switch defaultChecked={isDeveloper} onChange={(e) => { setDeveloper(!isDeveloper) }} />
                    </Grid>


                    <Button variant='contained' sx={{ width: '100%' }} onClick={() => { validate() }} >Create Account</Button>

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
