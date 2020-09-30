import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';

import {
    colorTheme
  } from '../../../../constants';

export const MyBackdrop = styled(Backdrop)`
    background-color: ${colorTheme.secondaryLight} !important;
    opacity: 0.3 !important; 
`;