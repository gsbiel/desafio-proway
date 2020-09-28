import React from 'react';
import SaveIcon from '@material-ui/icons/Save';

import {
    SignUpFormContainer,
    FormContainer,
    NameField,
    EmailField,
    LoginField,
    PasswordField,
    Title,
    SignUpBtn,
    CancelButton,
    HorizontalBox
} from './styles';

const SignUpForm = () => {

    return(
        <SignUpFormContainer>
            <FormContainer>

                <CancelButton 
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    X
                </CancelButton>

                <Title>
                    Sign up
                </Title>

                <NameField 
                    label="Name"
                    id="outlined-margin-none"
                    defaultValue=""
                    placeholder="Your name here."
                    helperText=""
                    variant="outlined"
                />

                <EmailField 
                    label="E-mail"
                    id="outlined-margin-none"
                    defaultValue=""
                    placeholder="Your e-mail here."
                    variant="outlined"
                    helperText=""
                />

                <HorizontalBox>
                    <LoginField 
                        label="Username"
                        id="outlined-margin-none"
                        defaultValue=""
                        placeholder="Your username here."
                        helperText=""
                        variant="outlined"
                    />

                    <PasswordField 
                        label="Password"
                        id="outlined-margin-none"
                        defaultValue=""
                        placeholder="Your password here."
                        variant="outlined"
                        helperText=""
                    />
                </HorizontalBox>

                <SignUpBtn 
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                >
                    Save
                </SignUpBtn>

            </FormContainer>
        </SignUpFormContainer>
    );

}

export default SignUpForm;