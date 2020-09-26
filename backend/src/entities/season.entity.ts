
// FALTA INSERIR O TYPEORM

import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import { Content } from "./common.content"
import { User } from "./user.entity"
import { Game } from "./game.entity"

@Entity({name: 'season'})
export class Season extends Content {

    @Column({nullable:false})
    start: Date

    @Column("date", { nullable: true })
    end: Date

    @Column("int",{ default:0 })
    min_score: Number

    @Column("int",{ default:0 })
    max_score: Number

    @Column("int",{ default:0 })
    min_score_count:Number

    @Column("int",{ default:0 })
    max_score_count:Number

    @ManyToOne(type => User, user => user.seasons)
    user: User

    @OneToMany(type => Game, game => game.season, 
        { 
            cascade: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    games: Game[]
}