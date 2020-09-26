import { Module } from "@nestjs/common";
import { SeasonsController } from "./seasons.controller";
import { SeasonsService } from "./seasons.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Season } from "src/entities/season.entity";
import { User } from "src/entities/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User,Season])],
    controllers: [SeasonsController],
    providers: [SeasonsService],
})

export class SeasonsModule {}
