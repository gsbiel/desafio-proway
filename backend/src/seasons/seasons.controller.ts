import { Get, Controller, Post } from "@nestjs/common";


@Controller('seasons')
export class SeasonsController {

    @Get()
    findAll(): string {
        return 'Returning all seasons...'
    }

    @Post()
    createSeason(): string{
        return 'Creating a season...'
    }


}