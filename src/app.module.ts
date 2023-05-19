import { Module } from '@nestjs/common';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entity/Feed';
import { AppController } from './app.contoller';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [Feed],
        synchronize: true,
        logging: false,
        
    }), TypeOrmModule.forFeature([Feed])],
    controllers: [AppController, FeedController],
    providers: [FeedService],
})
export class AppModule {}
