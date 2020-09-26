import { Controller, Get, Param, Delete, Post, Put, Body } from "@nestjs/common";
import { GamesService } from "./games.service";

@Controller('games')
export class GamesController {

    constructor( private readonly gamesService: GamesService){}

    @Post()
    createGame():string{
        return this.gamesService.createGame()
    }

    @Get()
    listGames():string{
        return this.gamesService.findAllGames()
    }

    @Get(':id')
    listGameById(@Param('id') id): string{
        return this.gamesService.findGameById(id)
    }

    @Put()
    updateGame(@Body('id') id):string{
        return this.gamesService.updateGame(id)
    }

    @Delete()
    deleteGames():string{
        return this.gamesService.deleteAllGames()
    }

    @Delete(':id')
    deleteGameById(@Param('id') id):string {
        return this.gamesService.deleteGameById(id)
    }
}