import { Module } from '@nestjs/common';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';
import { AppController } from './app.contoller';
import { FeedRepository } from './feed/feed.repository';




@Module({
    imports: [],
    controllers: [AppController, FeedController],
    providers: [FeedService, FeedRepository]
})

export class AppModule{}

