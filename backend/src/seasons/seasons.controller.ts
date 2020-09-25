import { Get, Controller, Post, Body, Query } from "@nestjs/common";
import { CreateSeasonDto } from "./seasons.dto";
import { SeasonsService } from "./seasons.service";


@Controller('seasons')
export class SeasonsController {

    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    findAll(): String {
        return this.seasonsService.findAllSeasons()
    }

    @Post()
    createSeason(@Body() createSeasonDto: CreateSeasonDto): String{
        return this.seasonsService.createSeason(createSeasonDto.name)
    }

}