import {
    IsString, 
    IsNotEmpty,
    IsUUID,
    IsOptional,
    } from 'class-validator';

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    forUserId: string
}

export class FindAllSeasonsDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string
}

export class DeleteSeasonsDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsOptional()
    @IsString()
    @IsUUID()
    seasonId: string
}