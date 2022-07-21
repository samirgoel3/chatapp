import React from 'react';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import COLORS from './constants';
import ROUTESNAMES from './constants';

const theme = createTheme({

  palette:{
    primary:{
      main: COLORS.COLORS.PRIMARY
    }
  },

  components:{
    MuiButton:{
      styleOverrides:{
        contained:{
          borderRadius:20,
          textTransform:'capitalize'
        }
      }
    },
    MuiTextField:{
      styleOverrides:{
        root:{
          fontWeight:700
        }
      }
    }
  },

  typography: {
    fontFamily: [
      'Noto Sans', 'sans-serif'
    ].join(','),
  },});





function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    
      <Routes>
        <Route path={ROUTESNAMES.ROUTESNAMES.ROOT} element={<Login />} />
        <Route path={ROUTESNAMES.ROUTESNAMES.LOGIN} element={<Login />} />
        <Route path={ROUTESNAMES.ROUTESNAMES.SIGN_UP} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
