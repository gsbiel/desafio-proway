import { Entity, Column, ManyToOne } from "typeorm"
import { Content } from "./common.content"
import { Season } from "./season.entity"

@Entity({name: 'game'})
export class Game extends Content {

    @Column("int",{ default:0 })
    score: number

    @Column("date")
    date: Date

    @ManyToOne(type => Season, season => season.games,
        { 
            onDelete: 'CASCADE'
        })
    season: Season
}