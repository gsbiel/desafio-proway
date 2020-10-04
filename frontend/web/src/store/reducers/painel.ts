import {

    PAINEL_SELECT_GAME,
    PAINEL_UNSELECT_GAME,

    PAINEL_ADD_GAME_TO_TRASH_LIST,
    PAINEL_REMOVE_GAME_FROM_TRASH_LIST,

    PAINEL_ADD_SEASON_TO_TRASH_LIST,
    PAINEL_REMOVE_SEASON_FROM_TRASH_LIST,

    PAINEL_CREATE_GAME_START,
    PAINEL_CREATE_GAME_SUCCESS,
    PAINEL_CREATE_GAME_FAILED,

    PAINEL_UPDATE_GAME_START,
    PAINEL_UPDATE_GAME_SUCCESS,
    PAINEL_UPDATE_GAME_FAILED,

    PAINEL_DELETE_GAME_START,
    PAINEL_DELETE_GAME_SUCCESS,
    PAINEL_DELETE_GAME_FAILED,

    PAINEL_SELECT_SEASON,
    PAINEL_UNSELECT_SEASON,

    PAINEL_CREATE_SEASON_STARTED,
    PAINEL_CREATE_SEASON_SUCCESS,
    PAINEL_CREATE_SEASON_FAILED,

    PAINEL_UPDATE_SEASON_STARTED,
    PAINEL_UPDATE_SEASON_SUCCESS,
    PAINEL_UPDATE_SEASON_FAILED,

    PAINEL_DELETE_SEASON_STARTED,
    PAINEL_DELETE_SEASON_SUCCESS,
    PAINEL_DELETE_SEASON_FAILED,

    PAINEL_REFRESH_TABLE_DATA,
    PAINEL_OPEN_DIALOGUE_FORM,
    PAINEL_CLOSE_DIALOGUE_FORM,

    PAINEL_LOGOUT,

    PAINEL_FETCH_SEASONS_START,
    PAINEL_FETCH_SEASONS_SUCCESS,
    PAINEL_FETCH_SEASONS_FAIL,

    PAINEL_FETCH_GAMES_START,
    PAINEL_FETCH_GAMES_SUCCESS,
    PAINEL_FETCH_GAMES_FAIL,

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
    selectedGameId: string,
    seasonsIdTrashList: string[],
    gamesIdTrashList: string[],
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
    selectedGameId?: string,
    errorMsg?: string,
    newSeason?: SeasonType,
    newGame?: GameType,
    gamesIdTrash?: string[],
    seasonsIdTrash?: string[],
    seasonsDeleted?: SeasonType[],
    gamesDeleted?: GameType[]
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

const painelSelectGame = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        selectedGameId: action.payload?.selectedGameId ? action.payload?.selectedGameId : ""
    };
};

const painelUnSelectGame = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        selectedGameId: ""
    };
};

const painelAddGameToTrashList = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        gamesIdTrashList: action.payload?.gamesIdTrash ? action.payload?.gamesIdTrash : [""]
    };
};

const painelRemoveGameFromTrashList = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
    }
}

const painelAddSeasonToTrashList = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        seasonsIdTrashList: action.payload?.seasonsIdTrash ? action.payload?.seasonsIdTrash : [""]
    }
}

const painelRemoveSeasonFromTrashList = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
    }
}

const painelCreateGameStart = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true,
    };
};

const painelCreateGameSuccess = (state: PainelStateSliceType, action: PainelActionType) => {
    if(action.payload?.newGame){
        const currentGames = state.games;
        const newGames = [...currentGames, action.payload?.newGame]
        return {
            ...state,
            games: newGames,
            isLoading: false
        };
    }else{
        return {
            ...state,
            isLoading: false
        };
    }
};

const painelCreateGameFailed = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg  : ""
    };
};

const painelUpdateGameStart =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true,
    };
};

const painelUpdateGameSuccess =  (state: PainelStateSliceType, action: PainelActionType) => {
    const newGame = action.payload?.newGame ? action.payload?.newGame  : null
    let filteredGames: GameType[] = [] 
    if(newGame) {
        filteredGames = state.games.filter(gameItem => {
            return gameItem.id !== newGame.id;
        })
        const newGames = [...filteredGames, newGame]
        return {
            ...state,
            games: newGames,
            isLoading: false
        }
    }
    else{
        return {
            ...state,
            isLoading: false
        }
    }
};

const painelUpdateGameFailed =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg  : ""
    };
};

const painelDeleteGameStart = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true,
    };
}

const painelDeleteGameSuccess = (state: PainelStateSliceType, action: PainelActionType) => {
    if(action.payload?.gamesDeleted?.length){
        let filteredGames: GameType[] = [];
        action.payload?.gamesDeleted.map( deletedGameItem => {
            filteredGames = state.games.filter(stateGameItem => {
                return deletedGameItem.id !== stateGameItem.id
            });
        });
        return {
            ...state,
            isLoading: false,
            games: filteredGames
        };
    }else{
        return{
            ...state,
            isLoading: false
        }
    }
}

const painelDeleteGameFailed = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg  : ""
    };
}

const painelCreateSeasonStarted =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true,
    };
};

const painelCreateSeasonSuccess =  (state: PainelStateSliceType, action: PainelActionType) => {
    const newSeason = action.payload?.newSeason ? action.payload?.newSeason : null;
    const newSeasonsState = newSeason ?  [
        ...state.seasons,
        newSeason
    ] : [...state.seasons]
    return {
        ...state,
        isLoading: false,
        seasons: newSeasonsState
    };
};

const painelCreateSeasonFailed =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg  : ""
    };
};

const painelUpdateSeasonStarted =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true,
    };
}

const painelUpdateSeasonSuccess =  (state: PainelStateSliceType, action: PainelActionType) => {

    const newSeason = action.payload?.newSeason ? action.payload?.newSeason  : null
    let filteredSeasons: SeasonType[] = [] 
    if(newSeason) {
        filteredSeasons = state.seasons.filter(season => {
            return season.id !== newSeason.id;
        })
        const newSeasons = [...filteredSeasons, newSeason]
        return {
            ...state,
            seasons: newSeasons,
            isLoading: false
        }
    }
    else{
        return {
            ...state,
            isLoading: false
        }
    }
}

const painelUpdateSeasonFailed =  (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg  : ""
    };
}

const painelDeleteSeasonStart = (state: PainelStateSliceType, action: PainelActionType) => {
    return{
        ...state,
        isLoading: true
    }
}

const painelDeleteSeasonSuccess =  (state: PainelStateSliceType, action: PainelActionType) => {
    if(action.payload?.seasonsDeleted?.length){
        let filteredSeasons: SeasonType[] = [];
        action.payload?.seasonsDeleted.map( deletedSeasonItem => {
            filteredSeasons = state.seasons.filter(stateSeasonItem => {
                return deletedSeasonItem.id !== stateSeasonItem.id
            });
        });
        return {
            ...state,
            isLoading: false,
            seasons: filteredSeasons
        };
    }else{
        return{
            ...state,
            isLoading: false
        }
    }
}

const painelDeleteSeasonFailed =  (state: PainelStateSliceType, action: PainelActionType) => {
    return{
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg : ""
    }
}

const painelRefreshTableData =  (state: PainelStateSliceType, action: PainelActionType) => {
    console.log(`Alterando modo para: ${action.payload?.formMode}`);
    return {
        ...state,
        dialogueEntityMode: action.payload?.formMode ? action.payload?.formMode : DialogueFormModeType.SEASON
    };
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
        seasons: action.payload?.seasons?.length ? action.payload?.seasons : []
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

const painelFetchGamesStart = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: true
    };
}

const painelFetchGamesSuccess = (state: PainelStateSliceType, action: PainelActionType) => {
    console.log(`Reducer: painelFetchSeasonsSuccess. Seasons:`)
    console.log(action.payload?.games)
    return {
        ...state,
        isLoading: false,
        games: action.payload?.games?.length ? action.payload?.games : []
    };
}

const painelFetchGamesFail = (state: PainelStateSliceType, action: PainelActionType) => {
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        errorMsg: action.payload?.errorMsg ? action.payload?.errorMsg : ""
    };
}

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
    selectedGameId: "",
    seasonsIdTrashList: [""],
    gamesIdTrashList: [""],
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

        case PAINEL_SELECT_GAME:
            return painelSelectGame(state, action);
        case PAINEL_UNSELECT_GAME:
            return painelUnSelectGame(state, action);

        case PAINEL_ADD_SEASON_TO_TRASH_LIST:
            return painelAddSeasonToTrashList(state, action);
        case PAINEL_REMOVE_SEASON_FROM_TRASH_LIST:
            return painelRemoveSeasonFromTrashList(state, action);

        case PAINEL_ADD_GAME_TO_TRASH_LIST:
            return painelAddGameToTrashList(state, action);
        case PAINEL_REMOVE_GAME_FROM_TRASH_LIST:
            return painelRemoveGameFromTrashList(state, action);

        case PAINEL_CREATE_GAME_START:
            return painelCreateGameStart(state, action);
        case PAINEL_CREATE_GAME_SUCCESS:
            return painelCreateGameSuccess(state, action);
        case PAINEL_CREATE_GAME_FAILED:
            return painelCreateSeasonFailed(state, action);

        case PAINEL_UPDATE_GAME_START:
            return painelUpdateGameStart(state, action);
        case PAINEL_UPDATE_GAME_SUCCESS:
            return painelUpdateGameSuccess(state, action);
        case PAINEL_UPDATE_GAME_FAILED:
            return painelUpdateSeasonFailed(state, action);

        case PAINEL_DELETE_GAME_START:
            return painelDeleteGameStart(state, action);
        case PAINEL_DELETE_GAME_SUCCESS:
            return painelDeleteGameSuccess(state, action);
        case PAINEL_DELETE_GAME_FAILED:
            return painelDeleteGameFailed(state, action);

        case PAINEL_CREATE_SEASON_STARTED:
            return  painelCreateSeasonStarted(state, action);
        case PAINEL_CREATE_SEASON_SUCCESS:
            return painelCreateSeasonSuccess(state, action);
        case PAINEL_CREATE_SEASON_FAILED:
            return painelCreateSeasonFailed(state, action);

        case PAINEL_UPDATE_SEASON_STARTED:
            return painelUpdateSeasonStarted(state, action);
        case PAINEL_UPDATE_SEASON_SUCCESS:
            return painelUpdateSeasonSuccess(state, action);
        case PAINEL_UPDATE_SEASON_FAILED:
            return painelUpdateSeasonFailed(state, action);

        case PAINEL_DELETE_SEASON_STARTED:
            return painelDeleteSeasonStart(state, action);
        case PAINEL_DELETE_SEASON_SUCCESS:
            return painelDeleteSeasonSuccess(state, action);
        case PAINEL_DELETE_SEASON_FAILED:
            return painelDeleteSeasonFailed(state, action);

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

        case PAINEL_FETCH_GAMES_START:
            return painelFetchGamesStart(state, action);
        case PAINEL_FETCH_GAMES_SUCCESS:
            return painelFetchGamesSuccess(state, action);
        case PAINEL_FETCH_GAMES_FAIL:
            return painelFetchGamesFail(state, action);

        case PAINEL_CLEAN_GAMES:
            return painelCleanGames(state, action);
        case PAINEL_LOGOUT:
            return painelLogout(state, action);
        default:
            return state;
    }
};

export default reducer;