import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const UpdateNameField = styled.div`
    width: 100%
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const SeasonNameField = styled(TextField)`
    width: 80% !important;
    margin-left: 15px !important;
`;