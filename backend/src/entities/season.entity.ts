
// FALTA INSERIR O TYPEORM

import { Entity, Column } from "typeorm"
import { Content } from "./common.content"

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
}