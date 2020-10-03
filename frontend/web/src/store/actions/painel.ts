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
} from '../actions/actionTypes';

import axios from 'axios';
import { DialogueFormActionType, PainelActionType, SeasonType, GameType } from '../reducers/painel';
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

export const painelRefreshTableData =  (
    mode: DialogueFormModeType, 
    seasons: SeasonType[] = [], 
    games: GameType[] = [] ,
    selectedRow:any = null) => {

    console.log("Refresh na tabela!")
    return {
        type: PAINEL_REFRESH_TABLE_DATA,
        payload: {
            formMode: mode,
            seasons: seasons,
            games: games,
            selectedRow: selectedRow
        }
    }

}

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

export const painelFetchSeasons = (token: string, userId: string) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            console.log("iniciando contagem do login...")
            setTimeout(resolve, ms)
            
        });
    }

    return async (dispatch:any) => {
        dispatch(painelCrudStart());
        await set_delay(2000);
        const seasons = fetchSeasons();
        dispatch(painelRefreshTableData(DialogueFormModeType.SEASON, seasons, [], null));
        dispatch(painelCrudSuccess());
    }
}

export const painelFetchGames = (token: string, forUserId: string, forSeason: SeasonType) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            console.log("iniciando contagem do login...")
            setTimeout(resolve, ms)
            
        });
    }

    return async (dispatch:any) => {
        dispatch(painelCrudStart());
        await set_delay(2000);
        const games = fetchGames();
        dispatch(painelRefreshTableData(DialogueFormModeType.GAME, [], games, null));
        dispatch(painelCrudSuccess());
    }

}

const fetchSeasons = (): SeasonType[] => {
    return [
        createSeasonData("ABsd",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AfffB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AeeeB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("ArtfB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AdvbhB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AgfhfB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AbnnbB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AghfB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("Acvb klB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AuuuiiB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AkjllB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AmB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData(" bnmmm  ",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AnbmbB",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
        createSeasonData("AghBg",'Cupcake', new Date('02/03/2020'), new Date('03/03/2020'), 305, 3.7, 67, 4.3),
    ];
};

const fetchGames = (): GameType[] => {
    return [
        createGameData('ghgfhfg','Jogo dos migos',150, new Date('01/03/2020')),
        createGameData('zxcdhgd','Jogo da escola',50, new Date('01/03/2020')),
        createGameData('werteryt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('wesdfrteryt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('wefgdgrteryt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('werdfawteryt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('wertcberyt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('werertyteryt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('werutuiteryt','ajsdajskdk',30, new Date('01/03/2020')),
        createGameData('wernvbnkteryt','ajsdajskdk',30, new Date('01/03/2020')),
    ]
}

export const createSeasonData = (
    id: string,
    name: string, 
    start: Date, 
    end: Date,
    min_score: number, 
    max_score: number, 
    min_score_count: number, 
    max_score_count: number,
    ) => {
    return { id, name, start, end, max_score,min_score, min_score_count, max_score_count};
}

export const createGameData = (
    id: string,
    name: string,
    score: number,
    date: Date
) => {
    return{
        id,
        name,
        score,
        date
    }
}