import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authHelper from '../authHelper';

/**
 * this function authenticates/protects our frontend routes/data
 * authHelper.js protects our backend data
 * copy paste this from google: https://tylermcginnis.com/react-router-protected-routes-authentication/
 * only renders component if logged in
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authHelper.isLoggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default PrivateRoute;