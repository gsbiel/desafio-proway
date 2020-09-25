import { Entity, Column } from "typeorm"
import { Content } from "./common.content"

@Entity()
export class Game extends Content {

    @Column()
    score: Number

    @Column()
    date: string
}