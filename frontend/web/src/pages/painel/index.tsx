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

    // const [open, setOpen] = useState(false);

    // const handleClickOpen = (action:string) => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return(
        <PainelContainer>
            <PainelHeader />
            { isLoading ? <LoadingBar color={"secondary"} /> :<StaticBar /> }
            <Table />
            {/* <DialogForm shouldOpen={isDialogueFormOpen} handleClose={handleClose} /> */}
            <DialogForm />
        </PainelContainer>
    )
}

export default Painel