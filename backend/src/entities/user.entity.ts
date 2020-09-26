
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Content } from './common.content';
import { Season } from './season.entity';


@Entity({name: 'user'})
export class User extends Content {

    @PrimaryColumn("varchar", { length: 20, unique: true, nullable: false})
    login: string

    @PrimaryColumn("varchar", { length: 100, unique: true, nullable: false})
    email: string

    @Column("varchar", { length: 50, nullable: false})
    password:string

    @OneToMany(type => Season, season => season.user, 
        { 
            cascade: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    seasons: Season[]
    
}