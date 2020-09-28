import styled from 'styled-components';
import {colorTheme} from '../../constants';
import Paper from "@material-ui/core/Paper";

const leftBoxWidth = 35;

export const AuthContainer = styled.div`
    width:100%;
    min-width: 1000px;
    height:100vh;
    background-color:${colorTheme.primaryLight};
`;

export const LeftBackgroundBox = styled.div`
    float: left;
    width: ${leftBoxWidth}%;
    height:100%;
    background-color:${colorTheme.primaryDark};
`;

export const StyledPaper = styled(Paper)`
  position: absolute;
  color: white;
  top:50px;
  right:50px;
  bottom:50px;
  left:50px;
  width:auto;
  height:auto;
  min-width:1000px;
  min-height: 690px;
`;
