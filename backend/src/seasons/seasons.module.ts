import { Module } from "@nestjs/common";
import { SeasonsController } from "./seasons.controller";


@Module({
    controllers: [SeasonsController],
    providers: [],
})

export class SeasonsModule {}
