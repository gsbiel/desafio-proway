import { Controller, Get, Param, Delete, Post, Put, Body, Request,Query, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { GamesService } from "./games.service";
import { CreateGameDto, ListGamesDto, FindGameDto, UpdateGameDto, DeleteGameDto } from "./games.dto";
import { Game } from "src/entities/game.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('games')
export class GamesController {

    constructor( private readonly gamesService: GamesService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createGame(@Request() req, @Body() createGameDto: CreateGameDto): Promise<Game>{
        this.validateAccess(req.user.userId, createGameDto.userId)
        return await this.gamesService.createGame(createGameDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async listGames(@Request() req, @Query() listGamesDto: ListGamesDto): Promise<Game[]>{
        this.validateAccess(req.user.userId, listGamesDto.userId)
        return await this.gamesService.findAllGames(listGamesDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId/:seasonId/:gameId')
    async listGameById(@Request() req, @Param() findGameDto: FindGameDto): Promise<Game>{
        this.validateAccess(req.user.userId, findGameDto.userId)
        return await this.gamesService.findGameById(findGameDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateGame(@Request() req, @Body() updateGameDto: UpdateGameDto): Promise<Game>{
        this.validateAccess(req.user.userId, updateGameDto.userId)
        return await this.gamesService.updateGame(updateGameDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteGames(@Request() req, @Body() deleteGamesDto: DeleteGameDto){
        this.validateAccess(req.user.userId, deleteGamesDto.userId)
        return await this.gamesService.deleteGames(deleteGamesDto)
    }

    validateAccess(userIdFromAuthentication, userIdSentByClient){
        if(userIdSentByClient !== userIdFromAuthentication){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN
            }, HttpStatus.FORBIDDEN)
        }
    }
}