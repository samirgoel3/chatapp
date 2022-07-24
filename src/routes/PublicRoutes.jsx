import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import ROUTESNAMES from '../constants/RoutesName';



const PublicRoutes = ({isAuthenticated, children}) => {
    if (isAuthenticated) {
      return <Navigate to={ROUTESNAMES.MAIN} />;
    }
  
    return children ? children : <Outlet />;
  };
  
  export default PublicRoutes;
  