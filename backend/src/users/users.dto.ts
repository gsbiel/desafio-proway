import {
    IsString, 
    IsNotEmpty,
    IsEmail,
    IsUUID,
    IsOptional,
    MinLength,
    MaxLength,
    IsLowercase
    } from 'class-validator';

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @IsLowercase()
    gender: string

}

export class UserBaseDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

}

export class UserFindByIdDto extends UserBaseDto {

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string

}

export class UserDeleteDto extends UserBaseDto {

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string
    
}