import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
        ){}

    private bcrypt = require('bcrypt')

    async validateUser(username: string, pass: string): Promise<any>{

        const user = await this.usersService.findUserByLogin(username)

        if(!user){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:'Wrong credentials provided'
            }, HttpStatus.BAD_REQUEST)
        }

        await this.verifyPassword(pass, user.password)

        const { password, ...result } = user
        return result
    }

    async login(user: any) {
        const payload = { username: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string){
        const isPasswordMatching = await this.bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:'Wrong credentials provided'
            }, HttpStatus.BAD_REQUEST)
          }
    }
}