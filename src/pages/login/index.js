import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ErrorInput from '../../components/common/ErrorInput'
import TechDescriptionView from '../../components/tech-description'
import ROUTESNAMES from '../../constants/RoutesName'
import './login.css'



export default function Login() {


    const [inputs, setInputs] = React.useState({ email: '', password: '' })
    const [error,setError] = React.useState({email:"",password:""})

    const handleInputChange = (inputKey, value) => {
        setInputs(prevState => ({ ...prevState, [inputKey]: value }))
        setError(prevState => ({...prevState, [inputKey]: ""}))
    }

    function handleError(errorKey, text){
        setError(prevState => ({...prevState, [errorKey]: text}))
    }

    const validate = () => {

        let isValid = true;

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

                    <ErrorInput
                        label='Email'
                        type={'normal'}
                        error={error.email}
                        onChange={(e) => { handleInputChange('email', e.target.value) }}
                        value={inputs.email} />

                    <ErrorInput
                        label='Password'
                        type={'password'}
                        error={error.password}
                        onChange={(e) => { handleInputChange('password', e.target.value) }}
                        value={inputs.password} />

                    <div className='button-container'>
                        <Button variant='contained' className='login-button' onClick={()=>{validate()}} > Login</Button>
                    </div>
                    <div className='signup-container' >
                        Don't have account?
                        <Link className='signup-text' to={ROUTESNAMES.SIGN_UP}> Sign up</Link>
                    </div>


                </div>

            </div>

        </div>
    )
}