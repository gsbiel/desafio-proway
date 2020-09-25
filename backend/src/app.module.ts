import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Connection} from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeasonsModule } from './seasons/seasons.module';

@Module({
  imports: [
    SeasonsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../database.sql',
      entities: [],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor( private connection: Connection) {}
}
