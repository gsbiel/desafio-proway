import {
    IsString, 
    IsNotEmpty,
    IsUUID,
    IsOptional,
    IsDate,
    IsDateString,
    } from 'class-validator';

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    forUserId: string

    @IsNotEmpty()
    @IsDateString()
    startDate: string
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