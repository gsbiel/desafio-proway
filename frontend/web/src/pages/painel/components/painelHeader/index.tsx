import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
    HeaderContainer,
    HeaderTitle,
    BackButton
} from './styles';


const PainelHeader = () => {

    return(
        <HeaderContainer>
            <BackButton
                title="Back" 
                aria-label="add" 
            >
                <Fab color="secondary">
                    <ArrowBackIcon style={{ fontSize: 30}} />
                </Fab>
            </BackButton>
            <HeaderTitle>Records</HeaderTitle>
        </HeaderContainer>
    );
};

export default PainelHeader;