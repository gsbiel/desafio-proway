import { Injectable, HttpService, HttpException, HttpStatus } from "@nestjs/common";
import { CreateGameDto, ListGamesDto, FindGameDto, UpdateGameDto, DeleteGamesDto } from "./games.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { Season } from "src/entities/season.entity";
import { Game } from "src/entities/game.entity";


@Injectable()
export class GamesService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Season)
        private seasonRepository: Repository<Season>,

        @InjectRepository(Game)
        private gameRepository: Repository<Game>

    ){}

    async createGame(createGameDto: CreateGameDto): Promise<Game> {

        const game = new Game()
        game.name = createGameDto.name
        game.score = createGameDto.score ? createGameDto.score : 0
        game.date = new Date()

        const season = await this.seasonRepository.find({
            where: {id:createGameDto.seasonId}
        })

        if(!season.length){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: "Resource not found." 
            }, HttpStatus.NOT_ACCEPTABLE)
        }

        game.season = season[0]
        await this.gameRepository.save(game)

        return game
    }

    async findAllGames(listGamesDto: ListGamesDto): Promise<Game[]> {

        const season = await this.seasonRepository.find({
            where: {id: listGamesDto.seasonId},
            relations: ["games"]
        })

        return season[0] ? season[0].games : []
    }

    async findGameById(findGameDto: FindGameDto): Promise<Game> { 

        const game = await this.gameRepository.find({
            where: {id: findGameDto.gameId}
        })

        if(!game[0]){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Resource not found"
            }, HttpStatus.NOT_FOUND)
        }

        return game[0]
    }

    async updateGame(updateGameDto: UpdateGameDto): Promise<Game>{

        if(!updateGameDto.name && !updateGameDto.score){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:"Invalid data"
            }, HttpStatus.BAD_REQUEST)
        }

        const game = await this.gameRepository.find({
            where: {id: updateGameDto.gameId}
        })

        if(!game[0]){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "There is no resource to be updated"
            }, HttpStatus.NOT_FOUND)
        }

        if(updateGameDto.name){
            game[0].name = updateGameDto.name
        }
        if(updateGameDto.score){
            game[0].score = updateGameDto.score
        }

        await this.gameRepository.save(game[0])

        return game[0]
    }

    async deleteAllGames(deleteGamesDto: DeleteGamesDto){

        const season = await this.seasonRepository.find({
            where: {id: deleteGamesDto.seasonId},
            relations: ["games"]
        })

        if(!season[0]){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: "There is nothing to be deleted."
            },HttpStatus.NOT_ACCEPTABLE)
        }

        season[0].games.forEach(async game => {
            await this.gameRepository.remove(game)
        })
        
    }

    deleteGameById(id:string):string{
        return `delete game by id ${id}`
    }

}