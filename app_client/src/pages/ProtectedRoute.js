import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authHelper from '../helpers/authHelper';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authHelper.isLoggedIn()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default PrivateRoute;