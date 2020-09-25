import {
    IsString, 
    IsNotEmpty,
    } from 'class-validator';


export class CreateSeasonDto {

    @IsString()
    @IsNotEmpty()
    name: string

}