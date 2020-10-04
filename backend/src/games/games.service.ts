import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateGameDto, ListGamesDto, FindGameDto, UpdateGameDto, DeleteGameDto } from "./games.dto";
import * as moment from 'moment';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { Season } from "src/entities/season.entity";
import { Game } from "src/entities/game.entity";
import {
    findSeasonForUser,
    findGameForSeason,
    findGamesForSeason,
    findUserJoinedWithSeasons
} from '../utility';

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
        game.date = new Date(createGameDto.gameDate)

        const season = await findSeasonForUser(createGameDto.userId, createGameDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        this.validateDates(season, game);
       
        const resultGame = {...game}

        const updatedSeason = this.updateSeasonScore(season, game)

        game.season = updatedSeason
        
        await this.gameRepository.save(game)

        await this.seasonRepository.save(updatedSeason);

        return resultGame
    }

    async findAllGames(listGamesDto: ListGamesDto): Promise<Game[]> {

        const season = await findSeasonForUser(listGamesDto.userId, listGamesDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const games = await findGamesForSeason(season.id,this.seasonRepository)

        if(!games){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        return games
    }

    async findGameById(findGameDto: FindGameDto): Promise<Game> { 

        const season = await findSeasonForUser(findGameDto.userId, findGameDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const game = await findGameForSeason(season.id, findGameDto.gameId, this.seasonRepository)

        if(!game){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        return game
    }

    async updateGame(updateGameDto: UpdateGameDto): Promise<Game>{

        if(!updateGameDto.name && !updateGameDto.score && !updateGameDto.gameDate){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:"Invalid data"
            }, HttpStatus.BAD_REQUEST)
        }

        const season = await findSeasonForUser(updateGameDto.userId, updateGameDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const game = await findGameForSeason(season.id, updateGameDto.gameId, this.seasonRepository)

        if(!game){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const oldGame = {...game}

        if(updateGameDto.name){
            game.name = updateGameDto.name
        }
        if(updateGameDto.score){
            game.score = updateGameDto.score
        }
        if(updateGameDto.gameDate){
            game.date = new Date(updateGameDto.gameDate)
        }

        this.validateDates(season, game);

        const rollbackedSeason = await this.rollBackOldGameEffectOnSeason(season, oldGame, this.seasonRepository);

        const newUpdatedSeason = this.updateSeasonScore(rollbackedSeason, game);
        
        await this.gameRepository.save(game);
        await this.seasonRepository.save(newUpdatedSeason);

        return game
    }

    async deleteAllGames(deleteGamesDto: DeleteGameDto){

        const season = await findSeasonForUser(deleteGamesDto.userId, deleteGamesDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const games = await findGamesForSeason(season.id, this.seasonRepository)

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

        const season = await findSeasonForUser(deleteGameByIdDto.userId, deleteGameByIdDto.seasonId, this.userRepository)

        if(!season){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const game = await findGameForSeason(season.id, deleteGameByIdDto.gameId, this.seasonRepository)

        if(!game){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        return await this.gameRepository.remove(game)
    }

    validateDates(season: Season, game: Game): boolean{

        if(moment(season.start).isAfter(moment(game.date))){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Game date must be later than season starting date."
            }, HttpStatus.BAD_REQUEST)
        }

        if(season.end && moment(season.end).isBefore(moment(game.date))){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Game date must be earlier than season ending date."
            }, HttpStatus.BAD_REQUEST)
        }

        return true;
    }

    updateSeasonScore(season: Season, game: Game): Season{

        const gameScore = game.score;

        if(!season.max_score && !season.min_score){
            season.max_score = gameScore
            season.min_score = gameScore
            return season;
        }
        else{
            if(season.max_score < gameScore){
                season.max_score = gameScore
                season.max_score_count =  season.max_score_count + 1;
            }else if(season.min_score > gameScore){
                season.min_score = gameScore
                season.min_score_count =  season.min_score_count + 1;
            }
        }

        return season;
    }

    async rollBackOldGameEffectOnSeason(season: Season, oldgame: Game, seasonRepository: Repository<Season>): Promise<Season>{
        if(season.max_score === oldgame.score){
            season.max_score_count = season.max_score_count ? season.max_score_count - 1 : 0

            const gamesForSeason = await findGamesForSeason(season.id, seasonRepository)
            const gamesFiltered = gamesForSeason.filter(gameItem => {
                return gameItem.id !== oldgame.id
            });
            let newMaxScore = 0
            gamesFiltered.map(gameItem => {
                if(gameItem.score > newMaxScore){
                    newMaxScore = gameItem.score
                }
            })
            season.max_score = newMaxScore
            return season;
        }else if(season.min_score === oldgame.score){
            season.min_score_count = season.min_score_count ? season.min_score_count - 1 : 0

            const gamesForSeason = await findGamesForSeason(season.id, seasonRepository)
            const gamesFiltered = gamesForSeason.filter(gameItem => {
                return gameItem.id !== oldgame.id
            });

            let newMinScore= 1000000000000
            gamesFiltered.map(gameItem => {
                if(gameItem.score < newMinScore){
                    newMinScore = gameItem.score
                }
            })
            season.min_score = newMinScore
            return season;
        }
    }

}