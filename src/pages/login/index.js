import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorInput from '../../components/common/ErrorInput'
import TechDescriptionView from '../../components/tech-description'
import ROUTESNAMES from '../../constants/RoutesName'
import Services from '../../network/services/'
import { actions } from '../../states/actions'
import './login.css'
import Storage from '../../storage'
import Localbase from 'localbase'
import { Button } from '@mui/material'



export default function Login() {

    const dispatch = useDispatch()
    const [inputs, setInputs] = React.useState({ email: '', password: '' })
    const [error, setError] = React.useState({ email: "", password: "" })
    const [loader, setLoader] = React.useState(false)

    const handleInputChange = (inputKey, value) => {
        setInputs(prevState => ({ ...prevState, [inputKey]: value }))
        setError(prevState => ({ ...prevState, [inputKey]: "" }))
    }

    function handleError(errorKey, text) {
        setError(prevState => ({ ...prevState, [errorKey]: text }))
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
            fetchLoginApi()
        }
    };


    const performDbtest = async () => {
        let db = new Localbase('chat-db')

        for (var i = 0; i < 1000; i++) {
            await db.collection('users').add({
                id: 4,
                name: 'Adam',
                age: 54,
                content: ['one', 'two']
            })
            console.log('DATA Saved '+i)
        }

        await db.collection('chat').add()

        //    let exactuser =  await db.collection('users').get()
        //    alert(exactuser.length)

    }




    const fetchLoginApi = async () => {
        try {
            setLoader(true)
            const data = await Services.AuthenticationService.getLogin(inputs.email, inputs.password)
            setLoader(false)
            if (!data) {
                dispatch(actions.ErrorDialogActions.showNoDataFromApi())
            } else {
                if (data.data.result === 1) {
                    Storage.Session.saveuserDetails(JSON.stringify(data.data.response))
                    window.location.reload(false)
                }
                else {
                    dispatch(actions.ErrorDialogActions.showError({ header: "Failed To login", description: "" + data.data.message }))

                }
            }
        } catch (e) {
            setLoader(false)
            dispatch(actions.ErrorDialogActions.showException(e.message))
        }
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
                        <LoadingButton
                            variant='contained'
                            loadingIndicator="Signing in..."
                            className='login-button'
                            loading={loader}
                            onClick={() => { validate() }} > Login</LoadingButton>

                    </div>

                    <Button onClick={() => { performDbtest() }}>TEST DB</Button>

                    <div className='signup-container' >
                        Don't have account?
                        <Link className='signup-text' to={ROUTESNAMES.SIGN_UP}> Sign up</Link>
                    </div>


                </div>

            </div>

        </div>
    )
}