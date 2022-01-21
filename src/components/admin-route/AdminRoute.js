import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuthenticated } from '../../helpers/storage&cookies/storage&cookies';

const AdminRoute = ({component : Component, ...rest}) => {

    return (
        <Route
            {...rest}
            render = {(props) => 
                isAuthenticated() && isAuthenticated().role === 1 ? 
                <Component  {...props} /> 
                :
                <Redirect to = '/' />   
            }
        />
    )
}

export default AdminRoute
