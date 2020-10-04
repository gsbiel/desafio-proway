import {
    IsString, 
    IsNotEmpty,
    IsUUID,
    IsOptional,
    IsDate,
    IsDateString,
    MaxLength,
    MinLength,
    } from 'class-validator';

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(1)
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

export class UpdateSeasonDto {

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    name: string

    @IsOptional()
    @IsDateString()
    endDate: string

    @IsOptional()
    @IsString()
    @IsUUID()
    seasonId: string

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string
}