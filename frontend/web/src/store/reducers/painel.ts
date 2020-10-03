import {
    PAINEL_CREATE_GAME,
    PAINEL_DELETE_GAME,
    PAINEL_UPDATE_GAME,

    PAINEL_SELECT_SEASON,
    PAINEL_UNSELECT_SEASON,

    PAINEL_CREATE_SEASON,
    PAINEL_DELETE_SEASON,
    PAINEL_UPDATE_SEASON,

    PAINEL_REFRESH_TABLE_DATA,
    PAINEL_OPEN_DIALOGUE_FORM,
    PAINEL_CLOSE_DIALOGUE_FORM,

    PAINEL_LOGOUT,

    PAINEL_FETCH_SEASONS_START,
    PAINEL_FETCH_SEASONS_SUCCESS,
    PAINEL_FETCH_SEASONS_FAIL,

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
    selectedSeasonId: string,
    games: GameType[],
    isLoading: boolean,
    isOnError: boolean,
    errorMsg: string,
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
    games?: GameType[],
    selectedSeasonId?: string,
    errorMsg?: string
};


const painelSelectSeason = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        selectedSeasonId: action.payload?.selectedSeasonId ? action.payload?.selectedSeasonId : ""
    };
};

const painelUnselectSeason = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        selectedSeasonId: ""
    };
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

const painelRefreshTableData =  (state: PainelStateSliceType, action: PainelActionType) => {
    if(action.payload?.seasons?.length){
        console.log("First case")
        return {
            ...state,
        }
    }else if(action.payload?.games?.length){
        console.log("Second case")
        return {
            ...state,
            dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.GAME,
            games: action.payload?.games
        }
    }else if(action.payload?.selectedSeasonId?.length){
        console.log("Third case")
            return {
                ...state,
                dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.GAME,
                selectedSeasonId: action.payload?.selectedSeasonId
            }
    }
    else{
        console.log("Fourth Case")
        return {
            ...state,
            dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.SEASON,
            selectedSeasonId: ""
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

const painelFetchSeasonsStart  = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true
    };
};

const painelFetchSeasonsSuccess  = (state: PainelStateSliceType, action: PainelActionType) => {
    console.log(`Reducer: painelFetchSeasonsSuccess. Seasons:`)
    console.log(action.payload?.seasons)
    return {
        ...state,
        isLoading: false,
        seasons: action.payload?.seasons ? action.payload?.seasons : []
    };
};

const painelFetchSeasonsFail  = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg : ""
    };
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
    selectedSeasonId: "",
    games: [],
    isLoading: false,
    isOnError: false,
    errorMsg: "",
    isDialogueFormOpen: false,
    dialogueEntityMode: DialogueFormModeType.SEASON,
    dialogueActionMode: DialogueFormActionType.NONE,
}

const reducer = (
    state: PainelStateSliceType = initialState,
    action: PainelActionType
): PainelStateSliceType => {

    switch(action.type){
        case PAINEL_SELECT_SEASON:
            return painelSelectSeason(state, action);
        case PAINEL_UNSELECT_SEASON:
            return painelUnselectSeason(state, action);
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
        case PAINEL_REFRESH_TABLE_DATA:
            return painelRefreshTableData(state, action);
        case PAINEL_OPEN_DIALOGUE_FORM:
            return painelOpenDialogueForm(state, action);
        case PAINEL_CLOSE_DIALOGUE_FORM:
            return painelCloseDialogueForm(state,action);
        case PAINEL_FETCH_SEASONS_START:
            return painelFetchSeasonsStart(state, action);
        case PAINEL_FETCH_SEASONS_SUCCESS:
            return painelFetchSeasonsSuccess(state, action);
        case PAINEL_FETCH_SEASONS_FAIL:
            return painelFetchSeasonsFail(state, action);
        case PAINEL_CLEAN_GAMES:
            return painelCleanGames(state, action);
        case PAINEL_LOGOUT:
            return painelLogout(state, action);
        default:
            return state;
    }
};

export default reducer;