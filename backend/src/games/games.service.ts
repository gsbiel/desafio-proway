import { Injectable, HttpService, HttpException, HttpStatus } from "@nestjs/common";
import { CreateGameDto, ListGamesDto } from "./games.dto";
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