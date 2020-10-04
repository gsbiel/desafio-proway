import { User } from "./entities/user.entity"
import { Repository } from "typeorm"
import { Season } from "./entities/season.entity"
import { Game } from "./entities/game.entity"


export const findSeasonForUser = async (userId: string, seasonId: string, userRepository: Repository<User>): Promise<Season> => {

    const user = await this.findUserJoinedWithSeasons(userId, userRepository)

    const season = user ? user.seasons.filter(seasonItem => {
        return seasonItem.id == seasonId
    }) : []

    return season[0]
}

export const findUserJoinedWithSeasons = async (userId: string, repository: Repository<User>): Promise<User> => {

    const user = await repository.findOne({
        where: {id: userId},
        relations:["seasons"]
    })

    return user
}

export const findGameForSeason = async (seasonId: string, gameId: string, repository: Repository<Season>): Promise<Game> => {

    const games = await this.findGamesForSeason(seasonId,repository)

    const game = games.filter(gameItem => {
        return gameItem.id == gameId
    })

    return game.length ? game[0] : null

}

export const findGamesForSeason = async (seasonId: string, repository: Repository<Season>): Promise<Game[]> => {

    const seasonEntity = await repository.find({
        where:{id: seasonId},
        relations:["games"]
    })

    return seasonEntity.length ? seasonEntity[0].games : []
}