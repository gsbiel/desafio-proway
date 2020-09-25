import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "./users.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    findUserById(): String {
        return "returning user..."
    }

    createUser(createUserDto: CreateUserDto): String {
        return `creating user ${createUserDto.name}`
    }
}