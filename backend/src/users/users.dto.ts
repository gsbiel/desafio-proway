import {
    IsString, 
    IsNotEmpty,
    IsEmail,
    IsUUID,
    IsOptional,
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