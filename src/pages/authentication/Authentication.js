import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import AuthenticationUI from './AuthenticationUI';
import { accountAuth } from '../../api/auth';


const Authentication = () => {

    const[confirmAccountData, setConfirmAccountData] = useState({
        username: '',
        successMessage : '',
        errorMessage : '',
        loading : false
    })

    const {token} = useParams();

    const confirmAccount = () => {
        const data = {token};
            setConfirmAccountData({
                ...confirmAccountData,
                loading: true
            });
            accountAuth(data)
            .then(response => {
                setConfirmAccountData({
                    username: response.data.username,
                    errorMessage : '',
                    successMessage: response.data.successMessage,
                    loading: false  
                });
                
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 401){
                    setConfirmAccountData({
                        ...confirmAccountData,
                        errorMessage: 'Incorrect or expired link',
                        loading: false
                    })         
                }
                else if(error.response.status === 500){
                    setConfirmAccountData({
                        ...confirmAccountData,
                        errorMessage: 'Server error: try again',
                        loading: false
                    })
                }
                else{
                    setConfirmAccountData({
                        ...confirmAccountData,
                        errorMessage: 'Something went wrong: try again',
                        loading: false
                    })
                }
            })      
    }

    useEffect(() => {
        confirmAccount()
    }, [])

    return (
       <AuthenticationUI
        confirmAccountData = {confirmAccountData}
       />
    )
}

export default Authentication
