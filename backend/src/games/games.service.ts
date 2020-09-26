import { Injectable } from "@nestjs/common";


@Injectable()
export class GamesService {

    createGame(): string {
        return "creating game.."
    }

    findAllGames():string {
        return 'list all games...'
    }

    findGameById(id: string): string { 
        return `returning games by id ${id}`
    }

    updateGame(id: string): string{
        return `update game by id ${id}`
    }

    deleteAllGames(): string{
        return 'deleting all games...'
    }

    deleteGameById(id:string):string{
        return `delete game by id ${id}`
    }

}