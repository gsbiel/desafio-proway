import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "./users.dto"

@Injectable()
export class UsersService {

    findUserById(): String {
        return "returning user..."
    }

    createUser(createUserDto: CreateUserDto): String {
        return `creating user ${createUserDto.name}`
    }
}