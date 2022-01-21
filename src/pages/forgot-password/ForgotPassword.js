import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import ForgotPasswordUI from './ForgotPasswordUI';
import { forgotPassword } from '../../api/auth';
import validator from 'validator';


const ForgotPassword = () => {

    let history = useHistory();

    const [forgotPwdData, setForgotPwdData] = useState({
        email: '',
        errorMessage: '',
        successMessage: '',
        loading: false
    })


    const{email, errorMessage, successMessage, loading} = forgotPwdData;

    const handleChange = (e) => {
        setForgotPwdData({
            ...forgotPwdData,
            [e.target.name]: e.target.value,
            errorMessage: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //API LOGIC
        
        if(!email){
            setForgotPwdData({
                ...forgotPwdData,
                errorMessage : 'Field is required'
            })
        }
        else if(!validator.isEmail(email)){
            setForgotPwdData({
                ...forgotPwdData,
                errorMessage : 'Invalid email'
            })
        }
        else{
            const data = {email};
            setForgotPwdData({
                ...forgotPwdData,
                loading: true
            })

            forgotPassword(data)
                .then(response => {
                    setForgotPwdData({
                        email: '',
                        errorMessage : '',
                        successMessage: response.data.successMessage,
                        loading: false  
                    });
                    
                    setTimeout(() => {
                        history.push('/')
                    }, 2000);
                })
                .catch(error => {
                    console.log(error)
                    if(error.response.status === 500){
                        setForgotPwdData({
                            ...forgotPwdData,
                            errorMessage: 'Something gone wrong. Try again',
                            loading: false
                        })
                    }
                    else{
                        setForgotPwdData({
                            ...forgotPwdData,
                            errorMessage: error.toString(),
                            loading: false
                        })
                    }
                })
        }
    }

    return (
        <ForgotPasswordUI
            forgotPwdData = {forgotPwdData}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit} 
        />
    )
}

export default ForgotPassword
