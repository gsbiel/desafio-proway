import { Controller, Get, Param, Delete, Post, Put, Body } from "@nestjs/common";


@Controller('games')
export class GamesController {

    @Post()
    createGame():string{
        return "create game..."
    }

    @Get()
    listGames():string{
        return 'list all games'
    }

    @Get(':id')
    listGameById(@Param('id') id): string{
        return `list game by id ${id}`
    }

    @Put()
    updateGame(@Body('id') id):string{
        return `update game by id ${id}`
    }

    @Delete()
    deleteGames():string{
        return 'delete all games'
    }

    @Delete(':id')
    deleteGameById(@Param('id') id):string {
        return `delete game by id ${id}`
    }
}