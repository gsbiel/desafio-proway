import { Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findById(): String{
        return this.usersService.findUserById()
    }

    @Post()
    createUser(): String {
        return this.usersService.createUser()
    }

}