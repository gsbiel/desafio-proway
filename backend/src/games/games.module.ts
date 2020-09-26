import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";

@Module({
    imports:[],
    controllers:[GamesController],
    providers: []
})

export class GamesModule {}