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
} from '../actions/actionTypes';

export enum DialogueFormModeType {
    SEASON,
    GAME,
}

export enum DialogueFormActionType {
    ADD,
    EDIT,
    DELETE,
    NONE
}

export interface GameType {

}

export interface SeasonType {

}

export interface PainelStateSliceType {
    currentTableSection: DialogueFormModeType,
    seasons: SeasonType[],
    games: GameType,
    isLoading: boolean,
    isOnError: boolean,
    isDialogueFormOpen: boolean,
    dialogueEntityMode: DialogueFormModeType,
    dialogueActionMode: DialogueFormActionType
}

export interface PainelActionType{
    type: string,
    payload: PainelPayloadType
}

export interface PainelPayloadType {

}

const painelCreateGame = (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelDeleteGame =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelUpdateGame =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelCreateSeason =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelDeleteSeason = (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelUpdateSeason =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelCrudStart =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelCrudSuccess =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelCrudFailed =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const painelRefreshTableData =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
}

const initialState: PainelStateSliceType = {
    currentTableSection: DialogueFormModeType.SEASON,
    seasons: [],
    games: [],
    isLoading: true,
    isOnError: false,
    isDialogueFormOpen: false,
    dialogueEntityMode: DialogueFormModeType.SEASON,
    dialogueActionMode: DialogueFormActionType.NONE,
}

const reducer = (
    state: PainelStateSliceType = initialState,
    action: PainelActionType
): PainelStateSliceType => {

    switch(action.type){
        case PAINEL_CREATE_GAME:
            return painelCreateGame(state, action);
        case PAINEL_DELETE_GAME:
            return painelDeleteGame(state, action);
        case PAINEL_UPDATE_GAME:
            return painelUpdateGame(state, action);
        case PAINEL_CREATE_SEASON:
            return  painelCreateSeason(state, action);
        case PAINEL_DELETE_SEASON:
            return painelDeleteSeason(state, action);
        case PAINEL_UPDATE_SEASON:
            return painelUpdateSeason(state, action);
        case PAINEL_CRUD_START:
            return painelCrudStart(state, action);
        case PAINEL_CRUD_SUCCESS:
            return painelCrudSuccess(state, action);
        case PAINEL_CRUD_FAILED:
            return painelCrudFailed(state, action);
        case PAINEL_REFRESH_TABLE_DATA:
            return painelRefreshTableData(state, action);
        default:
            return state;
    }
}

export default reducer;