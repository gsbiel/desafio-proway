import {
    IsString, 
    IsNotEmpty,
    IsEmail,
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