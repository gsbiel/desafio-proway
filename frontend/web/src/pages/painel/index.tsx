import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import DialogForm from './components/formDialog';
import PainelHeader from './components/painelHeader'
import {
    PainelContainer,
    StaticBar,
    LoadingBar
} from './styles';

import Table from './components/table';

const Painel = () => {

    const isLoading = useSelector( (state: RootState) => state.painel.isLoading )

    return(
        <PainelContainer>
            <PainelHeader />
            { isLoading ? <LoadingBar color={"secondary"} /> :<StaticBar /> }
            <Table />
            <DialogForm />
        </PainelContainer>
    )
}

export default Painel