import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {colorTheme} from '../../../../constants';

export const LoginFormContainer = styled.div`
    position:absolute;
    width: 100%;
    height:100%;
    padding:20px;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    align-items:center;
    z-index:3;
`;

export const LoginTitle = styled.span`
    position:absolute;
    top: 29%;
    color: ${colorTheme.primaryDark};
    font-size: 33px;
    font-weight: bolder;
`;

export const LoginField = styled(TextField)`
    top: 45%;
    width:50%;
    box-sizing: border-box;
`;

export const PasswordField = styled(TextField)`
    top:47%;
    width:50%;
    box-sizing: border-box;
`;

export const LoginButton = styled(Button)`
    text-transform: capitalize !important;
    font-weight: bolder !important;
    width:50%;
    top:50%;
`;

export const RegisterButton = styled(Button)`
    text-transform: capitalize !important;
    font-weight: bolder !important;
    width:50%;
    top:53%;
`;
