import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

export const PainelContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    border-radius: 0 20px 20px 0;
    box-sizing: border-box;
    flex-direction:column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(88,73,122);
`;

export const StaticBar = styled.div`
    width:100%;
    height: 50px;
    border-radius: 10px 10px 0 0;
    background-color: #E8E0EF;
    margin-right: 20px;
`;

export const LoadingBar = styled(LinearProgress)`
    width:100%;
    border-radius: 10px 10px 0 0 !important;
    height: 15px !important;
    margin-right: 20px !important;
`;