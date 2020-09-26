import {
    IsString, 
    IsNotEmpty,
    IsInt,
    IsPositive,
    Max,
    IsOptional,
    IsUUID,
    } from 'class-validator';

export class CreateGameDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsPositive()
    @IsInt()
    score: number

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    seasonId: string

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string
}
