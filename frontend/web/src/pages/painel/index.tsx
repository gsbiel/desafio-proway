import React, {useState} from 'react';

import DialogForm from './components/formDialog';

import {
    PainelContainer
} from './styles';

import Table from './components/table';

const Painel = () => {

    const [open, setOpen] = React.useState(false);
    const [dialogueFormMode, setDialogueFormMode] = React.useState({entity:"season",action:"add"})

    const handleClickOpen = (action:string) => {
        
        setOpen(true);
    };

    const handleClose = () => {
        console.log("Fechando modal...")
        setOpen(false);
    };

    return(
        <PainelContainer>
            <Table handleOpen={handleClickOpen} handleClose={handleClose}/>
            <DialogForm shouldOpen={open} handleClose={handleClose} mode={dialogueFormMode}/>
        </PainelContainer>
    )
}

export default Painel