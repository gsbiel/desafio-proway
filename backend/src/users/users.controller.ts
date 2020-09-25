import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findById(): String{
        return this.usersService.findUserById()
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): String {
        return this.usersService.createUser(createUserDto)
    }

}