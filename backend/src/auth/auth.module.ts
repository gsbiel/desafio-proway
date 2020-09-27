import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./local.strategy";
import { ConfigModule, ConfigService} from '@nestjs/config';
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[
        UsersModule, 
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
              signOptions: {expiresIn: '60s'}
            }),
            inject: [ConfigService],
        }),
    ],
    controllers:[],
    providers:[AuthService, LocalStrategy, JwtStrategy],
    exports:[AuthService]
})

export class AuthModule {}