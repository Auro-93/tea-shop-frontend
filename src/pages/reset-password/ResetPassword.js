import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import ResetPasswordUI from './ResetPasswordUI';
import { resetPassword } from '../../api/auth';
import validator from 'validator';

const ResetPassword = () => {

    let history = useHistory();

    const {token} = useParams();

    const [resetPwdData, setResetPwdData] = useState({
        password: '',
        errorMessage: '',
        successMessage: '',
        loading: false
    })

    const{password, errorMessage, successMessage, loading} = resetPwdData;

    const [isVisible, setIsVisible] = useState(false);

    const handlePwdVisibility = () => {
        setIsVisible(!isVisible)
    }


    const handleChange = (e) => {
        setResetPwdData({
            ...resetPwdData,
            [e.target.name]: e.target.value,
            errorMessage: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //API LOGIC

        if(!password){
            setResetPwdData({
                ...resetPwdData,
                errorMessage : 'Field is required'
            })
        }
        else if(!validator.isLength(password , {min:6})){
            setResetPwdData({
                ...resetPwdData,
                errorMessage : 'Password must be at least 6 characters'
            })
        }
        else{
            const data = {password, token};
            setResetPwdData({
                ...resetPwdData,
                loading: true
            })

            resetPassword(data)
            .then(response => {
                setResetPwdData({
                    password: '',
                    errorMessage : '',
                    successMessage: response.data.successMessage,
                    loading: false  
                });
                
                setTimeout(() => {
                    history.push('/sign-in')
                }, 2000);
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 401){
                    setResetPwdData({
                        ...resetPwdData,
                        errorMessage: 'Incorrect or expired link',
                        loading: false
                    })
                    setTimeout(() => {
                        history.push('/user/password/forgot-password')
                    }, 2000);
                }
                else if(error.response.status === 500){
                    setResetPwdData({
                        ...resetPwdData,
                        errorMessage: 'Server error: try again',
                        loading: false
                    })
                }
                else{
                    setResetPwdData({
                        ...resetPwdData,
                        errorMessage: error.toString(),
                        loading: false
                    })
                }
            })
        }

    }



    return (
        <ResetPasswordUI
            resetPwdData = {resetPwdData}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            handlePwdVisibility = {handlePwdVisibility}
            isVisible = {isVisible}
        />
        
    )
}

export default ResetPassword
