import { Controller, Get, Post, Body, Query, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";
import { User } from "src/entities/user.entity";


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findById(@Query('id') id: string): Promise<User[]>{
        return await this.usersService.findUserById(id)
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto)
    }

    @Delete()
    async deleteById(@Query('id') id: string){
        return await this.usersService.deleteUserById(id)
    }

}