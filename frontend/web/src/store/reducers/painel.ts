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
    PAINEL_CLOSE_DIALOGUE_FORM,

    PAINEL_LOGOUT,

    PAINEL_FETCH_SEASONS,
    PAINEL_FETCH_GAMES,

    PAINEL_CLEAN_GAMES
} from '../actions/actionTypes';

export enum DialogueFormModeType {
    SEASON = "SEASON",
    GAME = "GAME",
};

export enum DialogueFormActionType {
    ADD ="ADD",
    EDIT = "EDIT",
    DELETE = "DELETE",
    NONE = "NONE",
};

export interface GameType {
    id: string,
    name: string,
    score: number,
    date: Date
};

export interface SeasonType {
    id: string,
    name: string,
    start: Date,
    end: Date,
    min_score: number,
    max_score: number,
    min_score_count: number,
    max_score_count: number
};

export interface PainelStateSliceType {
    currentTableSection: DialogueFormModeType,
    seasons: SeasonType[],
    games: GameType[],
    isLoading: boolean,
    isOnError: boolean,
    isDialogueFormOpen: boolean,
    dialogueEntityMode: DialogueFormModeType,
    dialogueActionMode: DialogueFormActionType
};

export interface PainelActionType{
    type: string,
    payload?: PainelPayloadType
};

export interface PainelPayloadType {
    formAction?: DialogueFormActionType,
    formMode?: DialogueFormModeType,
    seasons?: SeasonType[],
    games?: GameType[]
};

const painelCreateGame = (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelDeleteGame =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelUpdateGame =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelCreateSeason =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelDeleteSeason = (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelUpdateSeason =  (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelCrudStart =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true
    };
};

const painelCrudSuccess =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
    };
};

const painelCrudFailed =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true
    };
};

const painelRefreshTableData =  (state: PainelStateSliceType, action: PainelActionType) => {
    if(action.payload?.seasons?.length){
        return {
            ...state,
            dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.SEASON,
            seasons: action.payload?.seasons
        }
    }else if(action.payload?.games?.length){
        return {
            ...state,
            dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.GAME,
            games: action.payload?.games
        }
    }
    else{
        return {
            ...state,
            dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.SEASON,
        }
    }
};

const painelOpenDialogueForm = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isDialogueFormOpen: true,
        dialogueActionMode: action.payload?.formAction ? action.payload?.formAction : DialogueFormActionType.NONE
    };
};

const painelCloseDialogueForm = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isDialogueFormOpen: false
    };
};

const painelLogout = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...initialState
    };
};

const painelFetchSeasons = (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelFetchGames = (state: PainelStateSliceType, action: PainelActionType) => {
    return state;
};

const painelCleanGames =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        games: []
    }
}

const initialState: PainelStateSliceType = {
    currentTableSection: DialogueFormModeType.SEASON,
    seasons: [],
    games: [],
    isLoading: false,
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
        case PAINEL_OPEN_DIALOGUE_FORM:
            return painelOpenDialogueForm(state, action);
        case PAINEL_CLOSE_DIALOGUE_FORM:
            return painelCloseDialogueForm(state,action);
        case PAINEL_FETCH_SEASONS:
            return painelFetchSeasons(state, action);
        case PAINEL_FETCH_GAMES:
            return painelFetchGames(state, action);
        case PAINEL_CLEAN_GAMES:
            return painelCleanGames(state, action);
        case PAINEL_LOGOUT:
            return painelLogout(state, action);
        default:
            return state;
    }
};

export default reducer;