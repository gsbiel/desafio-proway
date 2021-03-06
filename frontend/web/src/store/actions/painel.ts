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

    PAINEL_FETCH_SEASONS_START,
    PAINEL_FETCH_SEASONS_SUCCESS,
    PAINEL_FETCH_SEASONS_FAIL,

    PAINEL_FETCH_GAMES_START,
    PAINEL_FETCH_GAMES_SUCCESS,
    PAINEL_FETCH_GAMES_FAIL,

    PAINEL_CLEAN_GAMES,

    PAINEL_LOGOUT,
} from '../actions/actionTypes';

import axios from 'axios';
import { DialogueFormActionType, PainelActionType, SeasonType, GameType } from '../reducers/painel';
import { DialogueFormModeType } from '../reducers/painel';

const GAME_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/games`;
const SEASON_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/seasons`;

export const painelSelectSeason = (seasonId: string) => {
    return {
        type: PAINEL_SELECT_SEASON,
        payload:{
            selectedSeasonId: seasonId
        }
    };
};

export const painelUnselectSeason = () => {
    return {
        type: PAINEL_UNSELECT_SEASON
    };
};

export const painelSelectGame = (gameId: string) => {
    return {
        type: PAINEL_SELECT_GAME,
        payload:{
            selectedGameId: gameId
        }
    };
};

export const painelUnSelectGame = (gameId: string) => {
    return {
        type: PAINEL_UNSELECT_GAME,
    };
};

export const painelAddGameToTrashList = (gamesId: string[]) => {
    return {
        type: PAINEL_ADD_GAME_TO_TRASH_LIST,
        payload: {
            gamesIdTrash: gamesId
        }
    }
}

export const painelRemoveGameFromTrashList = (gameId: string) => {
    return {
        type: PAINEL_REMOVE_GAME_FROM_TRASH_LIST
    }
}

export const painelAddSeasonToTrashList = (seasonsId: string[]) => {
    return {
        type: PAINEL_ADD_SEASON_TO_TRASH_LIST,
        payload:{
            seasonsIdTrash: seasonsId
        }
    }
}

export const painelRemoveSeasonFromTrashList = (seasonId:string) => {
    return {
        type: PAINEL_REMOVE_SEASON_FROM_TRASH_LIST
    }
}


export const painelCreateSeasonStart = () => {
    return {
        type: PAINEL_CREATE_SEASON_STARTED,
    };
};

export const painelCreateSeasonSuccess = (newSeason : SeasonType) => {
    return {
        type: PAINEL_CREATE_SEASON_SUCCESS,
        payload:{
            newSeason: newSeason
        }
    };
};

export const painelCreateSeasonFailed = (errorMsg: string) => {
    return {
        type: PAINEL_CREATE_SEASON_FAILED,
        payload:{
            errorMsg: errorMsg
        }
    };
};

export const painelUpdateSeasonStart = () => {
    return{
        type: PAINEL_UPDATE_SEASON_STARTED
    }
}

export const painelUpdateSeasonSuccess = (season: SeasonType) => {
    return{
        type: PAINEL_UPDATE_SEASON_SUCCESS,
        payload:{
            newSeason: season
        }
    }
}

export const painelUpdateSeasonFailed = () => {
    return{
        type: PAINEL_UPDATE_SEASON_FAILED
    }
}

export const painelDeleteSeasonStart = () => {
    return{
        type: PAINEL_DELETE_SEASON_STARTED
    }
}

export const painelDeleteSeasonSuccess = (seasonsDeleted: SeasonType[]) => {
    return{
        type: PAINEL_DELETE_SEASON_SUCCESS,
        payload:{
            seasonsDeleted: seasonsDeleted
        }
    }
}

export const painelDeleteSeasonFailed = (errorMsg: string) => {
    return{
        type: PAINEL_DELETE_SEASON_FAILED,
        payload:{
            errorMsg: errorMsg
        }
    }
}

export const painelCreateGameStart = () => {
    return {
        type: PAINEL_CREATE_GAME_START
    }
}

export const painelCreateGameSuccess = (newGame: GameType) => {
    return {
        type: PAINEL_CREATE_GAME_SUCCESS,
        payload:{
            newGame: newGame
        }
    }
}

export const painelCreateGameFailed = () => {
    return {
        type: PAINEL_CREATE_GAME_FAILED
    }
}

export const painelUpdateGameStart = () => {
    return {
        type: PAINEL_UPDATE_GAME_START
    }
}

export const painelUpdateGameSuccess = (newGame: GameType) => {
    return {
        type: PAINEL_UPDATE_GAME_SUCCESS,
        payload:{
            newGame: newGame
        }
    };
};

export const painelUpdateGameFailed = () => {
    return {
        type: PAINEL_UPDATE_GAME_FAILED
    }
}

export const painelDeleteGameStart =  () => {
    return {
        type: PAINEL_DELETE_GAME_START
    }
}

export const painelDeleteGameSuccess =  (gamesDeleted: GameType[]) => {
    return {
        type: PAINEL_DELETE_GAME_SUCCESS,
        payload:{
            gamesDeleted: gamesDeleted
        }
    }
}

export const painelDeleteGameFailed=  (errorMsg: string) => {
    return {
        type: PAINEL_DELETE_GAME_FAILED,
        payload:{
            errorMsg: errorMsg
        }
    }
}

export const painelRefreshTableData =  (mode: DialogueFormModeType) => {
    return {
        type: PAINEL_REFRESH_TABLE_DATA,
        payload: {
            formMode: mode,
        }
    };
};

export const painelOpenDialogueForm = (formMode: DialogueFormModeType, formAction: DialogueFormActionType ): PainelActionType => {
    return {
        type: PAINEL_OPEN_DIALOGUE_FORM,
        payload:{
            formAction: formAction
        }
    }
}

export const painelCloseDialogueForm = () => {
    return{
        type: PAINEL_CLOSE_DIALOGUE_FORM
    }
}

export const painelLogout = () => {
    return{
        type: PAINEL_LOGOUT
    }
}

export const painelFetchSeasonsStart = () => {
    return{
        type: PAINEL_FETCH_SEASONS_START
    }
}

export const painelFetchSeasonsSuccess = (seasons: SeasonType[]) => {
    return{
        type: PAINEL_FETCH_SEASONS_SUCCESS,
        payload:{
            seasons: seasons
        }
    }
}

export const painelFetchSeasonsFail = (errorMsg: string) => {
    return{
        type: PAINEL_FETCH_SEASONS_FAIL,
        payload: {
            errorMsg: errorMsg
        }
    }
}

export const painelFetchGamesStart = () => {
    return{
        type: PAINEL_FETCH_GAMES_START
    }
}

export const painelFetchGamesSuccess = (games: GameType[]) => {
    return {
        type: PAINEL_FETCH_GAMES_SUCCESS,
        payload: {
            games: games
        }
    }
}

export const painelFetchGamesFail = (errorMsg: string) => {
    return{
        type: PAINEL_FETCH_GAMES_FAIL,
        payload: {
            errorMsg: errorMsg
        }
    }
}

export const painelFetchSeasons = (token: string, userId: string) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            setTimeout(resolve, ms)
            
        });
    }

    return async (dispatch:any) => {

        dispatch(painelFetchSeasonsStart());

        await set_delay(1500);

        axios({
            method: 'get',
            url: SEASON_URL,
            data: null,
            params: {
                userId
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(async resp => {
            const seasons = resp.data.map((dataItem: any) => {
                return {
                    ...dataItem,
                    start: new Date(dataItem.start),
                    end: dataItem.end ?  new Date(dataItem.end) : null
                };
            })
            dispatch(painelFetchSeasonsSuccess(seasons))
            dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));
        })
        .catch(err => {
            dispatch(painelFetchSeasonsFail(err.response.data))
        });
    }
}

export const painelFetchGames = (token: string, forUserId: string, forSeason: string) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            setTimeout(resolve, ms)
            
        });
    }

    return async (dispatch:any) => {

        dispatch(painelFetchGamesStart());

        await set_delay(1500); // Esse delay é apenas para permitir a visualização dos spinners :P

        axios({
            method: 'get',
            url: GAME_URL,
            data: null,
            params: {
                userId: forUserId,
                seasonId: forSeason
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(async resp => {
            const games = resp.data.map((dataItem: any) => {
                return {
                    ...dataItem,
                    date: new Date(dataItem.date),
                };
            })
            dispatch(painelFetchGamesSuccess(games));
            // dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));  
        })
        .catch(err => {
            dispatch(painelFetchGamesFail(err.response.data))
        });
    }

}

export const painelCreateSeason = (userToken: string, userId: string, seasonName: string, startDate: Date) => {

    return async (dispatch: any) => {

        dispatch(painelCreateSeasonStart());

        axios({
            method: 'post',
            url: SEASON_URL,
            data: {
                name: seasonName,
                forUserId: userId,
                startDate: startDate
            },
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(async resp => {
            const data = resp.data
            const season = {
                ...data,
                start: new Date(data.start)
            }
            dispatch(painelCreateSeasonSuccess(season));
            // dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));  
        })
        .catch(err => {
            dispatch(painelCreateSeasonFailed(err.response.data))
        });

    };
};

export const painelUpdateSeason = (userToken: string, userId: string, seasonId: string, name?: string, endDate?: Date) => {

    return async (dispatch:any) => {

        dispatch(painelUpdateSeasonStart());

        axios({
            method: 'put',
            url: SEASON_URL,
            data: {
                name: name,
                endDate: endDate,
                seasonId: seasonId,
                userId: userId
            },
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(async resp => {
            const data = resp.data
            const season = {
                ...data,
                start: new Date(data.start),
                end: data.end ? new Date(data.end) : null
            }
            dispatch(painelUpdateSeasonSuccess(season));
            // dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));  
        })
        .catch(err => {
            dispatch(painelUpdateSeasonFailed())
        });

    };
};

export const painelCreateGame = (userToken: string, userId: string, seasonId: string, gameName: string, gameScore: number, gameDate: Date) => {

    return async (dispatch: any) => {

        dispatch(painelCreateGameStart());

        axios({
            method: 'post',
            url: GAME_URL,
            data: {
                name: gameName,
                score: gameScore,
                seasonId: seasonId,
                userId: userId,
                gameDate: gameDate
            },
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(async resp => {
            const data = resp.data
            const game = {
                ...data,
                date: new Date(data.date),
            }
            dispatch(painelCreateGameSuccess(game));
            // dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));  
        })
        .catch(err => {
            dispatch(painelCreateGameFailed())
        });

    };
};

export const painelUpdateGame = (userToken: string, userId: string, seasonId: string, gameId: string, gameName: string, gameScore: number, gameDate: Date) => {

    return async (dispatch: any) => {

        dispatch(painelUpdateGameStart());

        axios({
            method: 'put',
            url: GAME_URL,
            data: {
                userId: userId,
                seasonId: seasonId,
                gameId: gameId,
                name: gameName,
                score: gameScore,
                gameDate: gameDate
            },
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(async resp => {
            const data = resp.data
            const game = {
                ...data,
                date: new Date(data.date),
            }
            dispatch(painelUpdateGameSuccess(game));
            // dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));  
        })
        .catch(err => {
            dispatch(painelUpdateGameFailed())
        });
    };
};

export const painelDeleteGames = (userToken: string, userId: string, seasonId: string, gamesToBeDeleted: string[]) => {
    return async (dispatch: any) => {
        dispatch(painelDeleteGameStart());
        axios({
            method: 'delete',
            url: GAME_URL,
            data: {
                userId: userId,
                seasonId: seasonId,
                gamesId: gamesToBeDeleted,
            },
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(async resp => {
            const data = resp.data
            const gamesDeleted = data.map((gameDeletedData:any )=> {
                return {
                    ...gameDeletedData,
                    date: new Date(gameDeletedData.date)
                }
            });
            dispatch(painelDeleteGameSuccess(gamesDeleted));
            dispatch(painelFetchGames(userToken, userId, seasonId));
            // dispatch(painelRefreshTableData(DialogueFormModeType.SEASON));  
        })
        .catch(err => {
            dispatch(painelDeleteGameFailed(err.response.data))
        });
    }
}

export const painelDeleteSeasons = (userToken: string, userId: string, seasonsToBeDeleted: string[]) => {

    return async (dispatch: any) => {
        dispatch(painelDeleteSeasonStart());

        axios({
            method: 'delete',
            url: SEASON_URL,
            data: {
                userId: userId,
                seasonsId: seasonsToBeDeleted,
            },
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(async resp => {
            const data = resp.data
            const seasonsDeleted = resp.data.map((seasonDeletedData:any )=> {
                return {
                    ...seasonDeletedData,
                    start: new Date(seasonDeletedData.start),
                    end: seasonDeletedData.end ? new Date(seasonDeletedData.end) : null
                }
            });
            dispatch(painelDeleteSeasonSuccess(seasonsDeleted));
            dispatch(painelFetchSeasons(userToken, userId));
        })
        .catch(err => {
            dispatch(painelDeleteSeasonFailed(err.response.data))
        });
    }
}

export const painelCleanGames = () => {
    return {
        type: PAINEL_CLEAN_GAMES
    };
};
