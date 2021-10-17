import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { theme } from './styles/Theme';
import LoadFile from './pages/LoadFile';
import Menu from './components/Menu';
import Home from './pages/Home';
import Footer from './components/Footer';
import DataGrid from './pages/DataGrid';
import Buscador from './pages/Buscador';

function App() {
  return (
      <div className="App">
        <header>
        <h1>Repositorio ITZ</h1>
        <br />
        <Menu></Menu>
        </header>
    
        <br />
  
       <Router>
         <div>
         <Route path={'/Home'} component={Home}></Route>
         <Route path={'/LoadFile'} component={LoadFile}></Route>
         <Route path={'/DataGrid'} component={DataGrid}></Route>
         <Route path={'/Buscador'} component={Buscador}></Route>
         <Route path={'/Logout'} component={AmplifySignOut}></Route>
         </div>
  
       </Router>
  
        <ThemeProvider theme={theme}>
        <>
        <GlobalStyles />
        </>
      </ThemeProvider>
  
      <Footer /> 
      </div>
    );
}

export default withAuthenticator(App);
