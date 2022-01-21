import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuthenticated } from '../../helpers/storage&cookies/storage&cookies';

const UserRoute = ({component : Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {(props) => 
                isAuthenticated() && isAuthenticated().role === 0 ? 
                <Component  {...props} /> 
                :
                <Redirect to = '/'  />   
            }
        />
    )
}

export default UserRoute
