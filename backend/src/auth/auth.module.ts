import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./local.strategy";
import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports:[
        UsersModule, 
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers:[],
    providers:[AuthService, LocalStrategy],
    exports:[AuthService]
})

export class AuthModule {}