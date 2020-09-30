import { Controller, Get, Post, Body, Query, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UserFindByIdDto, UserDeleteDto } from "./users.dto";
import { User } from "src/entities/user.entity";


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findById(@Query() findByIdDto: UserFindByIdDto): Promise<User[]>{
        return await this.usersService.findUserById(findByIdDto)
    }

    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto)
    }

    // @Post("/signin")
    // async loginUser("")

    @Delete()
    async deleteById(@Query() userDeleteDto: UserDeleteDto){
        if(userDeleteDto.userId){
            return await this.usersService.deleteUserById(userDeleteDto)
        }else{
            return await this.usersService.deleteAllUsers()
        }    
    }

}