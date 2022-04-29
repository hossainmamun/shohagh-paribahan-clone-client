import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App.js';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedINUser, setLoggedInUser] = useContext(userContext)
    let location = useLocation();

    if (loggedINUser.userEmail) {
        return children;
    }
    return <Navigate to="/login_signup" state={{ from: location }} replace />;
};

export default PrivateRoute;