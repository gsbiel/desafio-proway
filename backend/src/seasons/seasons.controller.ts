import { Get, Controller, Post, Body, Query, Request,HttpException, HttpStatus, Delete, UseGuards, Put } from "@nestjs/common";
import { CreateSeasonDto, FindAllSeasonsDto, DeleteSeasonsDto, UpdateSeasonDto } from "./seasons.dto";
import { SeasonsService } from "./seasons.service";
import { Season } from "src/entities/season.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('seasons')
export class SeasonsController {

    constructor(private readonly seasonsService: SeasonsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllSeasonsForUser(@Request() req, @Query() findAllSeasonsDto: FindAllSeasonsDto ): Promise<Season[]> {
        this.validateAccess(findAllSeasonsDto.userId, req.user.userId)
        return await this.seasonsService.findAllSeasonsForUser(findAllSeasonsDto.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createSeason(@Request() req, @Body() createSeasonDto: CreateSeasonDto): Promise<Season>{
        this.validateAccess(createSeasonDto.forUserId, req.user.userId)
        return await this.seasonsService.createSeason(createSeasonDto.name, createSeasonDto.forUserId, createSeasonDto.startDate)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateSeason(@Request() req, @Body() updateSeasonDto: UpdateSeasonDto){
        this.validateAccess(updateSeasonDto.userId, req.user.userId)
        return await this.seasonsService.updateSeasonForUserId(updateSeasonDto.userId, updateSeasonDto.seasonId, updateSeasonDto.name, updateSeasonDto.endDate)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteSeasons(@Request() req, @Body() deleteSeasonsDto: DeleteSeasonsDto){
        this.validateAccess(deleteSeasonsDto.userId, req.user.userId)
        return await this.seasonsService.deleteSeasonsForUserId(deleteSeasonsDto.userId,deleteSeasonsDto.seasonsId)
    }

    validateAccess(userIdFromAuthentication, userIdSentByClient){
        if(userIdSentByClient !== userIdFromAuthentication){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN
            }, HttpStatus.FORBIDDEN)
        }
    }
}