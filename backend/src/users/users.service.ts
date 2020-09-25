import { Injectable } from "@nestjs/common"

@Injectable()
export class UsersService {

    findUserById(): String {
        return "returning user..."
    }

    createUser(): String {
        return "creating user..."
    }
}