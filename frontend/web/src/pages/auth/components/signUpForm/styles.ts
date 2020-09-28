import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

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
`;

export const FormContainer = styled(Paper)`
    position: relative;
    width: 80%;
    height: 80%;
    border-radius: 20px !important;
    // background-color: ${colorTheme.primary} !important;
    box-shadow: 10px 10px 10px 10px ${colorTheme.primary} !important;
`;

