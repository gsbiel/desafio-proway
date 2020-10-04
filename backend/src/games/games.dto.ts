import {
    IsString, 
    IsNotEmpty,
    IsInt,
    IsPositive,
    IsOptional,
    IsUUID,
    IsDateString,
    } from 'class-validator';

/* 
    Classe usada para evitar repetição de código nas que estão abaixo
*/
export class UserSeasonBaseDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    seasonId:string

}

/* 
    Classe usada para evitar repetição de código nas que estão abaixo
*/
export class UserSeasonGameBaseDto extends UserSeasonBaseDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    gameId:string

}


export class CreateGameDto extends UserSeasonBaseDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsPositive()
    @IsInt()
    score: number

    @IsNotEmpty()
    @IsString()
    @IsDateString()
    gameDate: string

}

export class ListGamesDto extends UserSeasonBaseDto {}

export class FindGameDto extends UserSeasonGameBaseDto { }

export class UpdateGameDto extends UserSeasonGameBaseDto {

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsInt()
    score: number

}

export class DeleteGameDto extends UserSeasonGameBaseDto{

    @IsOptional()
    @IsString()
    @IsUUID()
    gameId:string

}