import React from 'react';
import Fab from '@material-ui/core/Fab';
import {useSelector, useDispatch} from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {RootState} from '../../../../index';

import {
    HeaderContainer,
    HeaderTitle,
    BackButton
} from './styles';

import {painelRefreshTableData} from '../../../../store/actions/painel';
import { DialogueFormModeType } from '../../../../store/reducers/painel';


const PainelHeader = () => {

    const dispatch = useDispatch();
    const formDialogueMode = useSelector( (state: RootState) => state.painel.dialogueEntityMode);

    const onBackButtonHandler = () => {
        dispatch(painelRefreshTableData(DialogueFormModeType.SEASON))
    }

    return(
        <HeaderContainer>
            {
                formDialogueMode == DialogueFormModeType.GAME ?
                <BackButton
                    title="Back" 
                    aria-label="add"
                    onClick={() => onBackButtonHandler() }   
                >
                    <Fab color="secondary">
                        <ArrowBackIcon style={{ fontSize: 30}} />
                    </Fab>
                </BackButton> :
                null
            }
            <HeaderTitle>Records</HeaderTitle>
        </HeaderContainer>
    );
};

export default PainelHeader;