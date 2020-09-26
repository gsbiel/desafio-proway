import { Get, Controller, Post, Body, Query, HttpException, HttpStatus, Delete } from "@nestjs/common";
import { CreateSeasonDto } from "./seasons.dto";
import { SeasonsService } from "./seasons.service";
import { Season } from "src/entities/season.entity";


@Controller('seasons')
export class SeasonsController {

    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    async findAllSeasonsForUser(@Query('userId') id: string ): Promise<Season[]> {
        return await this.seasonsService.findAllSeasonsForUser(id)
    }

    @Post()
    async createSeason(@Body() createSeasonDto: CreateSeasonDto): Promise<Season>{
        return await this.seasonsService.createSeason(createSeasonDto.name, createSeasonDto.forUserId)
    }

    @Delete()
    async deleteSeasons(@Query('userId') userId:string, @Query('seasonId') seasonId:string){
        return await this.seasonsService.deleteSeasonForUserId(userId,seasonId)
    }

}