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