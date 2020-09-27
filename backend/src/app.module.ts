import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Connection} from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeasonsModule } from './seasons/seasons.module';
import { User } from './entities/user.entity';
import { Season } from './entities/season.entity';
import { Game } from './entities/game.entity';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    SeasonsModule,
    UsersModule,
    GamesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../database.sql',
      entities: [User, Season, Game],
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor( private connection: Connection) {}
}
