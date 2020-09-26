import { Controller, Get, Param, Delete, Post, Put, Body, Query } from "@nestjs/common";
import { GamesService } from "./games.service";
import { CreateGameDto, ListGamesDto } from "./games.dto";
import { Game } from "src/entities/game.entity";

@Controller('games')
export class GamesController {

    constructor( private readonly gamesService: GamesService){}

    @Post()
    async createGame(@Body() createGameDto: CreateGameDto): Promise<Game>{
        return await this.gamesService.createGame(createGameDto)
    }

    @Get()
    async listGames(@Query() listGamesDto: ListGamesDto): Promise<Game[]>{
        return await this.gamesService.findAllGames(listGamesDto)
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