import React from 'react';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import COLORS from './constants';
import ROUTESNAMES from './constants';
import Main from './pages/main';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoutes from './routes/PublicRoutes';
import Dev from './pages/dev';
import Analytics from './pages/analytics';
import AnywhereAccesible from './routes/AnywhereAccesibleRoutes';
import { Provider } from 'react-redux';
import {store} from './states';
import BottomErrorDialog from './components/common/BottomErrorDialog';
import Session from './storage/Session';
import MessageLoader from './pages/message-loader';


const theme = createTheme({

  palette: {
    primary: {
      main: COLORS.COLORS.PRIMARY
    },
    secondary:{
      main:'#ffffff'
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 20,
          textTransform: 'capitalize'
        }
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          textTransform:'capitalize',
          color: 'rgba(255, 255, 255, 0.7)',
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontWeight: 700
        }
      }
    }
  },

  typography: {
    fontFamily: [
      'Noto Sans', 'sans-serif'
    ].join(','),
  },
});


const isLoggedin = Session.getUserData() === null? false : true;




function App() {
  return (<Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <BottomErrorDialog/>
        <Routes>

          {/* public routes */}
          <Route element={<PublicRoutes  />}>
            <Route path={ROUTESNAMES.ROUTESNAMES.LOGIN} element={<Login />} />
            <Route path={ROUTESNAMES.ROUTESNAMES.SIGN_UP} element={<SignUp />} />
          </Route>

          

         
         
          {/* private routes */}
          <Route element={<ProtectedRoute  />}>
            <Route path={ROUTESNAMES.ROUTESNAMES.LOADING} element={<MessageLoader />}/>
            <Route path={'/'} element={<Main />} exact/>
            <Route path={ROUTESNAMES.ROUTESNAMES.MAIN} element={<Main />} />
            <Route path={ROUTESNAMES.ROUTESNAMES.ANALYTICS} element={<Analytics />} />
          </Route>

         
          
          
          {/* routes which need login state but can be access withoput login */}
          <Route element={<AnywhereAccesible />}>
            <Route path={ROUTESNAMES.ROUTESNAMES.DEV} element={<Dev />} />
          </Route>

          {/* when page is not found */}
          <Route path={ROUTESNAMES.ROUTESNAMES.ALL} element={<>Page not found for this LINK</>} />


        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
