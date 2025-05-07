import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../component/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { loading, user } = use(AuthContext)
    const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(user && user.email){
        return children
    }
    
    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default PrivateRoute;