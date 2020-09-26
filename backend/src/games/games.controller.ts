import { Controller, Get, Param, Delete, Post, Put, Body, Query } from "@nestjs/common";
import { GamesService } from "./games.service";
import { CreateGameDto, ListGamesDto, FindGameDto, UpdateGameDto, DeleteGamesDto } from "./games.dto";
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

    @Get(':gameId')
    async listGameById(@Param() findGameDto: FindGameDto): Promise<Game>{
        return await this.gamesService.findGameById(findGameDto)
    }

    @Put()
    async updateGame(@Body() updateGameDto: UpdateGameDto): Promise<Game>{
        return await this.gamesService.updateGame(updateGameDto)
    }

    @Delete()
    async deleteGames(@Body() deleteGamesDto: DeleteGamesDto){
        return await this.gamesService.deleteAllGames(deleteGamesDto)
    }

    @Delete(':id')
    deleteGameById(@Param('id') id):string {
        return this.gamesService.deleteGameById(id)
    }
}