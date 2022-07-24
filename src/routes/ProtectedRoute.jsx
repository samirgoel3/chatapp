import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import ROUTESNAMES from '../constants/RoutesName';
import TopBar from '../components/topbar';


const ProtectedRoute = ({isAuthenticated, children, ...rest}) => {
    if (!isAuthenticated) {
      return <Navigate to={ROUTESNAMES.LOGIN} />;
    }
    return children ? children : <TopBar><Outlet {...rest}/></TopBar>;
  };
  
  export default ProtectedRoute;
  