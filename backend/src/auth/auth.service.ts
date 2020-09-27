import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
        ){}

    async validateUser(username: string, pass: string): Promise<any>{
        console.log("entrei no validateUser")
        const user = await this.usersService.findUserByLogin(username)
        if (user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any) {
        console.log("entrei aqui")
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}