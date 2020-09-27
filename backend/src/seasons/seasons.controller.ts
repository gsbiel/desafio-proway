import { Get, Controller, Post, Body, Query, HttpException, HttpStatus, Delete } from "@nestjs/common";
import { CreateSeasonDto, FindAllSeasonsDto, DeleteSeasonsDto } from "./seasons.dto";
import { SeasonsService } from "./seasons.service";
import { Season } from "src/entities/season.entity";

@Controller('seasons')
export class SeasonsController {

    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    async findAllSeasonsForUser(@Query() findAllSeasonsDto: FindAllSeasonsDto ): Promise<Season[]> {
        return await this.seasonsService.findAllSeasonsForUser(findAllSeasonsDto.userId)
    }

    @Post()
    async createSeason(@Body() createSeasonDto: CreateSeasonDto): Promise<Season>{
        return await this.seasonsService.createSeason(createSeasonDto.name, createSeasonDto.forUserId)
    }

    @Delete()
    async deleteSeasons(@Query() deleteSeasonsDto: DeleteSeasonsDto){
        if(deleteSeasonsDto.seasonId){
            return await this.seasonsService.deleteSeasonForUserId(deleteSeasonsDto.userId,deleteSeasonsDto.seasonId)
        }
        else{
            return await this.seasonsService.deleteAllSeasonsForUserId(deleteSeasonsDto.userId)
        } 
    }
}