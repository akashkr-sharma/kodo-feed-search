import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entity/Feed';
import { AppController } from './app.contoller';
import { Config } from './config/data-source';
import { FeedSeeder } from './feed/seeders/feed.seeder'




@Module({
    imports: [TypeOrmModule.forRoot(Config), TypeOrmModule.forFeature([Feed])],
    controllers: [AppController, FeedController],
    providers: [FeedService, FeedSeeder]
})
// export class AppModule {}

export class AppModule implements OnApplicationBootstrap {
    constructor(
      private readonly feedSeeder: FeedSeeder,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
      await this.feedSeeder.seed();
    }
  }
