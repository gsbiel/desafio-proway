import {
    PAINEL_CREATE_GAME,
    PAINEL_DELETE_GAME,
    PAINEL_UPDATE_GAME,

    PAINEL_CREATE_SEASON,
    PAINEL_DELETE_SEASON,
    PAINEL_UPDATE_SEASON,

    PAINEL_CRUD_START,
    PAINEL_CRUD_SUCCESS,
    PAINEL_CRUD_FAILED,

    PAINEL_REFRESH_TABLE_DATA,
    PAINEL_OPEN_DIALOGUE_FORM,
    PAINEL_CLOSE_DIALOGUE_FORM
} from '../actions/actionTypes';

import axios from 'axios';
import { DialogueFormActionType } from '../reducers/painel';
import { DialogueFormModeType } from '../reducers/painel';

const GAME_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/games`;
const SEASON_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/seasons`;

export const painelCreateGame = () => {
    console.log("Criar game!")
    return {
        type: PAINEL_CREATE_GAME
    }
}

export const painelDeleteGame =  () => {
    console.log("Deletar game!")
    return {
        type: PAINEL_DELETE_GAME
    }
}

export const painelUpdateGame = () => {
    console.log("atualizar game!")
    return {
        type: PAINEL_UPDATE_GAME
    }
}

export const painelCreateSeason =  () => {
    console.log("Criar Season!")
    return {
        type: PAINEL_CREATE_SEASON
    }
}

export const painelDeleteSeason = () => {
    console.log("Deletar Season!")
    return {
        type: PAINEL_DELETE_SEASON
    }
}

export const painelUpdateSeason =  () => {
    console.log("Atualizar Season!!")
    return {
        type: PAINEL_UPDATE_SEASON
    }
}

export const painelCrudStart = () => {
    console.log("Operação CRUD iniciando...")
    return {
        type: PAINEL_CRUD_START
    }
}

export const painelCrudSuccess =  () => {
    console.log("Operação CRUD bem sucedida! :)")
    return {
        type: PAINEL_CRUD_SUCCESS
    }
}

export const painelCrudFailed =  () => {
    console.log("Operação CRUD falhou! :(")
    return {
        type: PAINEL_CRUD_FAILED
    }
}

export const painelRefreshTableData =  () => {
    console.log("Refresh na tabela!")
    return {
        type: PAINEL_REFRESH_TABLE_DATA
    }
}

export const painelOpenDialogueForm = (formMode: DialogueFormModeType, formAction: DialogueFormActionType ) => {
    return {
        type: PAINEL_OPEN_DIALOGUE_FORM,
        formMode: formMode,
        formAction: formAction
    }
}

export const painelCloseDialogueForm = () => {
    return{
        type: PAINEL_CLOSE_DIALOGUE_FORM
    }
}