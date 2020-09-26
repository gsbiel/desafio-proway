
import { Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

/* 
    Essa classe implementa os campos que as entidades game, season e user possuem em comum.
*/

export class Content {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 100, nullable:false})
    name: string

}