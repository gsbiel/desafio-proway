
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Content } from './common.content';

@Entity()
export class User extends Content {

    @PrimaryColumn("varchar", { length: 20 })
    login: string

    @PrimaryColumn("varchar", { length: 100 })
    email: string

    @Column("varchar", { length: 50 })
    password:string
    
}