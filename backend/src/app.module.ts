import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeasonsModule } from './seasons/seasons.module';

@Module({
  imports: [SeasonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
