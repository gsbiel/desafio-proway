import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

export const HeaderContainer = styled.div`
    width: 100%;
    border-radius: 20px;
    height:80px;
    background-color: rgba(88,73,122);
    display: flex;
    justify-content:center;
    align-items:center;
`;

export const HeaderTitle = styled.span`
    color: #ffff;
    width: 100%;
    position: absolute;
    font-weight: bolder;
    font-size: 24px;
    text-align: center;
    z-index: 0; 
`;

export const BackButton = styled(Tooltip)`
    width:50px !important;
    height:50px !important;
    border-radius: 25px !important;
    position: absolute important!;
    z-index: 2 !important;
    right:48% !important;
`;
