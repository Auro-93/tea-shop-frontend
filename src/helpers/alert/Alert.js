import React from 'react';

const Alert = ({alertType, message, customClass, handleClick}) => {
    return (
        <div className = {`my-3 alert ${alertType} ${customClass} py-2`} role="alert" onClick = {handleClick}>
            {message}
        </div>
    )
}

export default Alert
