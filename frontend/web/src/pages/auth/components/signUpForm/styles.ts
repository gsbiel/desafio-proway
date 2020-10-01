import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';

import {colorTheme} from '../../../../constants';

export const SignUpFormContainer = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    // visibility:hidden;
`;

export const FormContainer = styled(Paper)`
    position: relative;
    width: 80%;
    height: 80%;
    border-radius: 20px !important;
    box-shadow: 10px 10px 10px 10px ${colorTheme.primary} !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: flex-start;
`;

export const CancelButton = styled(Button)`
    position: absolute;
    top:2%;
    left:45%;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 20px !important;
    background: red !important;
    font-weight: bolder !important;
    font-size: 24px !important;
`;

export const Title = styled.span`
    position:relative;
    top:10%;
    text-align: center;
    font-size: 30px;
    color: ${colorTheme.primaryDark}
`;

export const NameField = styled(TextField)`
    position:relative;
    width:80%;
    top:20%;
`;

export const RadioGroup = styled.div`
    position: relative;
    width:80%;
    height: 50px;
    top: 22%;
    z-index:4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const RadioItem = styled(Radio)`
    position: relative !important;
    margin-right:20px;
`;

export const RadioLabel = styled.span`
    font-size: 18px;
    margin-left:20px;
    color: ${colorTheme.primaryDark}
`;

export const EmailField = styled(TextField)`
    position:relative;
    width:80%;
    top:24%;
`;

export const HorizontalBox = styled.div`
    position:relative;
    width:80%;
    top:26%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const LoginField =styled(TextField)`
    position:relative;
    width:50%;
    // top: 27%;
    box-sizing: border-box !important;
    margin-right: 5px !important;
`;

export const PasswordField = styled(TextField)`
    position:relative;
    width:50%;
    // top: 27%;
    box-sizing: border-box;
    box-sizing: border-box !important;
`;

export const SignUpBtn = styled(Button)`
    position:relative;
    width:40%;
    top:32%;
    text-transform: capitalize !important;
`;

export const LoadingSpinner = styled(CircularProgress)`
    position:relative;
    top:38%;
`;
