import { Get, Controller, Post, Body, Query } from "@nestjs/common";
import { CreateSeasonDto } from "./seasons.dto";


@Controller('seasons')
export class SeasonsController {

    @Get()
    findAll(): string {
        return 'Returning all seasons...'
    }

    @Post()
    createSeason(@Body() createSeasonDto: CreateSeasonDto): string{
        return `creating season ${createSeasonDto.name}...`
    }

}