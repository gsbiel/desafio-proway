import React from 'react';
import Auth from './pages/auth';

import {
  AppContainer,
  StyledPaper,
  LeftBackgroundBox,
  RightBackgroundBox,
  FakeOpacityBox
} from './App_styles.js'

function App() {
  return (
    <AppContainer>
      <StyledPaper elevation={3}>
        <LeftBackgroundBox/>
        <RightBackgroundBox>
            <FakeOpacityBox/>

        </RightBackgroundBox>
      </StyledPaper>
    </AppContainer>
  );
}

export default App;
