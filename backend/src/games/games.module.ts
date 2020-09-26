import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Season } from "src/entities/season.entity";
import { Game } from "src/entities/game.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User, Season, Game])],
    controllers:[GamesController],
    providers: [GamesService]
})

export class GamesModule {}