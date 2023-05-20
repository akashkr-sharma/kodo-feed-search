import { Module } from '@nestjs/common';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entity/Feed';
import { AppController } from './app.contoller';
import { Config } from './config/data-source'

@Module({
    imports: [TypeOrmModule.forRoot(Config), TypeOrmModule.forFeature([Feed])],
    controllers: [AppController, FeedController],
    providers: [FeedService],
})
export class AppModule {}
