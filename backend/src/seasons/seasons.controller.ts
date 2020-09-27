import { Get, Controller, Post, Body, Query, Request,HttpException, HttpStatus, Delete, UseGuards } from "@nestjs/common";
import { CreateSeasonDto, FindAllSeasonsDto, DeleteSeasonsDto } from "./seasons.dto";
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
        return await this.seasonsService.createSeason(createSeasonDto.name, createSeasonDto.forUserId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteSeasons(@Request() req, @Query() deleteSeasonsDto: DeleteSeasonsDto){
        this.validateAccess(deleteSeasonsDto.userId, req.user.userId)
        if(deleteSeasonsDto.seasonId){
            return await this.seasonsService.deleteSeasonForUserId(deleteSeasonsDto.userId,deleteSeasonsDto.seasonId)
        }
        else{
            return await this.seasonsService.deleteAllSeasonsForUserId(deleteSeasonsDto.userId)
        } 
    }

    validateAccess(userIdFromAuthentication, userIdSentByClient){
        if(userIdSentByClient !== userIdFromAuthentication){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN
            }, HttpStatus.FORBIDDEN)
        }
    }
}