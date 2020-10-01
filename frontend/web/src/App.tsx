import React from 'react';

import {
  useSelector
} from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


import Painel from './pages/painel';
import Auth from './pages/auth';
import Bubble from './components/bubble/Bubble';
import UserProfile from './components/userProfile'

import { RootState } from './index';

import {
  AppContainer,
  StyledPaper,
  LeftBackgroundBox,
  RightBackgroundBox,
} from './App_styles.js'

function App() {

  const isUserLogged = useSelector( (state: RootState) => state.auth.isUserLogged )

  return (
    <AppContainer>
      <StyledPaper elevation={3}>

        <LeftBackgroundBox>

          <Bubble />
          
          <UserProfile />

        </LeftBackgroundBox>
        
        <RightBackgroundBox>

          <Switch>

            <Route path="/painel" >
              <Painel />
            </Route>
            
            <Route path="/login">
              <Auth />
            </Route>

            <Route exact path="/" >
              <Redirect to="/login" /> 
            </Route>

          </Switch>
          
          {isUserLogged ? <Redirect to="/painel"/> : <Redirect to="/login"/>}

        </RightBackgroundBox>
      </StyledPaper>
    </AppContainer>
  );
}

export default App;
