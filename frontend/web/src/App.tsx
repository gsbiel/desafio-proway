import React from 'react';
import Painel from './pages/painel';
import Auth from './pages/auth';

import {
  AppContainer,
  StyledPaper,
  LeftBackgroundBox,
  RightBackgroundBox,
} from './App_styles.js'

function App() {
  return (
    <AppContainer>
      <StyledPaper elevation={3}>
        <LeftBackgroundBox/>
        <RightBackgroundBox>

            <Auth />
            {/* <Painel/> */}

        </RightBackgroundBox>
      </StyledPaper>
    </AppContainer>
  );
}

export default App;
