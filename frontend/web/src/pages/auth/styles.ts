import styled from 'styled-components';
import {colorTheme} from '../../constants';
import Paper from "@material-ui/core/Paper";
import {K} from '../../constants';

import sportsImage from '../../assets/sports_drawing.jpeg'

const leftBoxWidth = K.leftBoxWidth;

export const AuthContainer = styled.div`
    position: relative;
    width:100%;
    min-width: 1000px;
    height:100vh;
    background-color:${colorTheme.primaryLight};
`;

export const LeftBackgroundBox = styled.div`
    position: relative;
    float: left;
    width: ${leftBoxWidth}%;
    height:100%;
    background-color:${colorTheme.primaryDark};
    border-radius: 20px 0 0 20px;
`;

export const RightBackgroundBox = styled.div`
    position: relative;
    float: right;
    width: ${100-leftBoxWidth}%;
    height:100%;
    background-color:#ffff;
    background-image: url(${sportsImage});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
`;

export const FakeOpacityBox = styled.div`
    position: absolute;
    width: 100%;
    height:100%;
    background-color: rgba(255, 255, 255, 0.88);
    z-index: 2;
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
  z-index: 1;
  border-radius: 20px !important;
`;
