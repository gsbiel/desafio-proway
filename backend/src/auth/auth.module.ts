import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { jwtConstants } from '../../constants'



@Module({
    imports:[
        UsersModule, 
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.JWT_SECRET,
            signOptions: { expiresIn: '3600s' },
          }),
    ],
    controllers:[],
    providers:[AuthService, LocalStrategy, JwtStrategy],
    exports:[AuthService]
})

export class AuthModule {
    constructor(){}
}