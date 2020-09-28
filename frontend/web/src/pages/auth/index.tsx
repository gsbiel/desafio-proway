import * as React from "react";

import {
    AuthContainer,
    StyledPaper,
    LeftBackgroundBox
} from './styles';

const Auth = () => {
    return(
        <AuthContainer>
            <StyledPaper elevation={3}>
                <LeftBackgroundBox />
            </StyledPaper>
        </AuthContainer>
    );
};

export default Auth;