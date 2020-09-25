import { Injectable } from "@nestjs/common";

@Injectable()
export class SeasonsService {

    findAllSeasons(): String {
        return 'Returning all seasons...'
    }

    createSeason(name: String): String {
        return `creating season ${name}...`
    }
}