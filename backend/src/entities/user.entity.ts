
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Content } from './common.content';
import { Season } from './season.entity';


@Entity()
export class User extends Content {

    @PrimaryColumn("varchar", { length: 20 })
    login: string

    @PrimaryColumn("varchar", { length: 100 })
    email: string

    @Column("varchar", { length: 50 })
    password:string

    @OneToMany(type => Season, season => season.user)
    seasons: Season[]
    
}