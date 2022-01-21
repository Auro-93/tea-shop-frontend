import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';


const ErrorPage = () => {
    return (
        <div className = 'd-flex justify-content-center align-items-center vh-100 error-bg'
        >
            <div className = 'text-center error-container'>
                    <h1>404</h1>
                    <p>OOPS! PAGE NOT FOUND</p>
                    <div className = 'auth-back-to-home text-center'>
                       <Link to = '/'><p>Back to <span><span>Tea</span> Store</span></p></Link> 
                    </div>
            </div>
        </div>
    )
}

export default ErrorPage
