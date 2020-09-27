import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateGameDto, ListGamesDto, FindGameDto, UpdateGameDto, DeleteGameDto } from "./games.dto";
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

        const season = await this.findSeasonForUser(createGameDto.userId, createGameDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        game.season = season

        await this.gameRepository.save(game)

        return game
    }

    async findAllGames(listGamesDto: ListGamesDto): Promise<Game[]> {

        const season = await this.findSeasonForUser(listGamesDto.userId, listGamesDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const games = await this.findGamesForSeason(season.id,this.seasonRepository)

        if(!games){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        return games
    }

    async findGameById(findGameDto: FindGameDto): Promise<Game> { 

        const season = await this.findSeasonForUser(findGameDto.userId, findGameDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const game = await this.findGameForSeason(season.id, findGameDto.gameId, this.seasonRepository)

        if(!game){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        return game
    }

    async updateGame(updateGameDto: UpdateGameDto): Promise<Game>{

        if(!updateGameDto.name && !updateGameDto.score){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:"Invalid data"
            }, HttpStatus.BAD_REQUEST)
        }

        const season = await this.findSeasonForUser(updateGameDto.userId, updateGameDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const game = await this.findGameForSeason(season.id, updateGameDto.gameId, this.seasonRepository)

        if(!game){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        if(updateGameDto.name){
            game.name = updateGameDto.name
        }
        if(updateGameDto.score){
            game.score = updateGameDto.score
        }

        await this.gameRepository.save(game)

        return game
    }

    async deleteAllGames(deleteGamesDto: DeleteGameDto){

        const season = await this.findSeasonForUser(deleteGamesDto.userId, deleteGamesDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const games = await this.findGamesForSeason(season.id, this.seasonRepository)

        if(!games){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        games.forEach(async game => {
            await this.gameRepository.remove(game)
        })

    }

    async deleteGameById(deleteGameByIdDto: DeleteGameDto){

        const season = await this.findSeasonForUser(deleteGameByIdDto.userId, deleteGameByIdDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const game = await this.findGameForSeason(season.id, deleteGameByIdDto.gameId, this.seasonRepository)

        if(!game){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        return await this.gameRepository.remove(game)
    }


/* 
-----------------------------------------------------------------------------------------------------------------
    HELPER FUNCTIONS
-----------------------------------------------------------------------------------------------------------------
*/
    async findSeasonForUser(userId: string, seasonId: string, userRepository: Repository<User>): Promise<Season>{

        const user = await this.findUserJoinedWithSeasons(userId, userRepository)

        const season = user ? user.seasons.filter(seasonItem => {
            return seasonItem.id == seasonId
        }) : []

        return season[0]
    }

    async findUserJoinedWithSeasons(userId: string, repository: Repository<User>): Promise<User> {

        const user = await repository.findOne({
            where: {id: userId},
            relations:["seasons"]
        })

        return user
    }

    async findGameForSeason(seasonId: string, gameId: string, repository: Repository<Season>): Promise<Game> {

        const games = await this.findGamesForSeason(seasonId,repository)

        const game = games.filter(gameItem => {
            return gameItem.id == gameId
        })

        return game.length ? game[0] : null

    }

    async findGamesForSeason(seasonId: string, repository: Repository<Season>): Promise<Game[]>{

        const seasonEntity = await repository.find({
            where:{id: seasonId},
            relations:["games"]
        })

        return seasonEntity.length ? seasonEntity[0].games : []
    }

}