import { Injectable, HttpException, HttpStatus} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Season } from "src/entities/season.entity";
import { Repository } from "typeorm";

@Injectable()
export class SeasonsService {

    constructor(

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Season)
        private seasonRepository: Repository<Season>

    ){}

    async findAllSeasonsForUser(id: string): Promise<Season[]> {
        console.log(id)
        const user = await this.userRepository.find({ 
            where: {id:id},
            relations: ["seasons"] });
        
        return user[0] ? user[0].seasons : []
    }

    async createSeason(name: string, forUserId: string): Promise<Season> {
        if(!name.length){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Season must have a non empty name."
            }, HttpStatus.BAD_REQUEST)
        }

        const user = await this.userRepository.find({
            where: { id: forUserId }
        })

        if(!user.length){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "User does not exist."
            }, HttpStatus.BAD_REQUEST)
        }

        const season = new Season()
        season.name = name
        season.min_score_count = 0
        season.max_score_count = 0
        season.max_score = 0
        season.min_score = 0
        season.start = new Date()
        season.user = user[0]
        season.games = []

        await this.seasonRepository.save(season)
        
        return season
    }

    async deleteSeasonForUserId(userId:string, seasonId:string){

        if(!seasonId || !userId){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Lack of information"
            }, HttpStatus.BAD_REQUEST)
        }

        const seasons = await this.findAllSeasonsForUser(userId)

        if(!seasons.length){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: "There is no item to be deleted."
            }, HttpStatus.NOT_ACCEPTABLE)
        }

        if(seasonId == "all"){
            console.log("deletando todas as seasons...")
            seasons.forEach( async season => {
                return await this.seasonRepository.remove(season)
            })
        }

        else{
            console.log("Deletando uma season...")
            const season = seasons.filter(seasonItem => {
                return seasonItem.id == seasonId
            })
            return await this.seasonRepository.remove(season[0])
        }
    }

}