
// FALTA INSERIR O TYPEORM

import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import { Content } from "./common.content"
import { User } from "./user.entity"
import { Game } from "./game.entity"

@Entity()
export class Season extends Content {

    @Column("varchar", { length: 100 })
    start: string

    @Column("varchar", { length: 100 })
    end: string

    @Column()
    min_score: Number

    @Column()
    max_score: Number

    @Column()
    min_score_count:Number

    @Column()
    max_score_count:Number

    @ManyToOne(type => User, user => user.seasons)
    user: User

    @OneToMany(type => Game, game => game.season)
    games: Game[]
}