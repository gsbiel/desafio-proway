import * as React from "react";

import {
    AuthContainer,
    StyledPaper,
    LeftBackgroundBox,
    RightBackgroundBox,
    FakeOpacityBox
} from './styles';
import LoginForm from "./components/loginForm";

const Auth = () => {
    return(
        <AuthContainer>

            <StyledPaper elevation={3}>

                <LeftBackgroundBox />

                <RightBackgroundBox>

                    <FakeOpacityBox/>

                    <LoginForm />

                </RightBackgroundBox>

            </StyledPaper>

        </AuthContainer>
    );
};

export default Auth;