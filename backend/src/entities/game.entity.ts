import { Entity, Column, ManyToOne } from "typeorm"
import { Content } from "./common.content"
import { Season } from "./season.entity"

@Entity()
export class Game extends Content {

    @Column()
    score: Number

    @Column()
    date: string

    @ManyToOne(type => Season, season => season.games)
    season: Season
}