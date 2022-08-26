import React from 'react';
import { Outlet } from "react-router-dom";


const AnywhereAccesible = () => {
    // if (!isAuthenticated) {
    //   return <Navigate to={ROUTESNAMES.LOGIN} />;
    // }
    // return children ? children : <TopBar><Outlet {...rest}/></TopBar>;
    return <Outlet {...rest}/>
  };
  
  export default AnywhereAccesible;
  