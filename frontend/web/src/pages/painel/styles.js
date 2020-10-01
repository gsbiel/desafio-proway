import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

export const PainelContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    box-sizing: border-box;
    flex-direction:column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(88,73,122);
`;

export const StaticBar = styled.div`
    width:100%;
    height: 50px;
    background-color: #E8E0EF;
`;

export const LoadingBar = styled(LinearProgress)`
    width:100%;
    height: 15px !important;
`;