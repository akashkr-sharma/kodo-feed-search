import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';

describe('AppController', () => {
  let appController: FeedController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [FeedService],
    }).compile();

    appController = app.get<FeedController>(FeedController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
