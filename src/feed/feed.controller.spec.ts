import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../config/data-source';
import { Feed } from '../entity/Feed';
import feedData  from '../../data/mock_data.json';
// import { getRepository } from 'typeorm';
// import { FeedSeeder, seeder } from './seeders/feed.seeder';



describe('FeedController', () => {
  let feedController: FeedController;
  let feedService: FeedService;
  // let feedRepository: Repository<Feed>;
  // let FeedSeeder: FeedSeeder;

  beforeEach(async () => {
    const feed: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(Config), TypeOrmModule.forFeature([Feed])],
      controllers: [FeedController],
      providers: [FeedService],
    }).compile();

    feedController = feed.get<FeedController>(FeedController);
    feedService = feed.get<FeedService>(FeedService);
    await feedService.runSeeder()

    // function bufferTIme() {
    //   return new Promise<void>((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve()
    //     }, 1000)
    //   })
    // }
    // await bufferTIme()
    
    // feedRepository = feed.selectContextModule(new Repository(Feed)) //(new Repository(Feed))
  });

  describe('1) Feed Seeder', () => {
    it('should return seeder successfully run', async() => {

      const response = await feedController.getAllFeed();
      const feedObject = await feedService.getAllFeed();
      expect(response.data.length).toBe(feedObject.data.length);
    });

    it('2) should return seeder successfully run', async() => {
      const response = await feedController.getAllFeed();
      const feedObject = await feedService.getAllFeed();
      expect(response.data).toMatchObject(feedObject.data);
    });

  });

});



describe('FeedController', () => {
  let feedController: FeedController;
  let feedService: FeedService;

  beforeEach(async () => {
    const feed: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(Config), TypeOrmModule.forFeature([Feed])],
      controllers: [FeedController],
      providers: [FeedService],
    }).compile();

    feedController = feed.get<FeedController>(FeedController);
    feedService = feed.get<FeedService>(FeedService);
    await feedService.runSeeder()
  });



  it('1) feed controller', async() => {
    const response = await feedController.getAllFeed();
    expect(response.data.length).toEqual(feedData.length);
  });

  it('2) feed controller: getFeedData() check for invalid page response (GET)',async () => {
    const allFeedResponse = await feedController.getAllFeed();
    const apiResponseLimit = 20
    const invalidPage = Math.ceil(allFeedResponse.data.length/apiResponseLimit);
    const searchFeedResponse = await feedController.getFeedData("", invalidPage, apiResponseLimit);
    expect(searchFeedResponse.data.length).not.toEqual(apiResponseLimit)
  })

  it('3) feed controller: getFeedData() response count (GET)', async() => {
    const responseDataLimit = 20;
    const page = 0;
    const searchFeedResponse = await feedController.getFeedData("", page, responseDataLimit);
    expect(searchFeedResponse.data.length).toEqual(responseDataLimit)
  });


  it('4) feed controller: getFeedData() with key="The King" (with quote)',async () => {
    const responseDataLimit = 20;
    const page = 0;
    const searchFeedResponse = await feedController.getFeedData(`"The King"`, page, responseDataLimit);
    const expectedResponseData = {
        "name": "The Lord of the Rings: The Return of the King",
        "image": "https://picsum.photos/640/480",
        "description": "Nihil hic neque dignissimos totam omnis ut aut. Fugiat voluptatem rem quisquam provident est odit. Necessitatibus veniam architecto quia. Rerum deserunt reiciendis velit voluptatem tempora iusto similique. Atque mollitia pariatur quia voluptatem qui laborum laborum rerum molestias.",
        "dateLastEdited": "2018-08-06T08:27:26.187Z"
    }
    console.log("searchFeedResponse: ", searchFeedResponse)
    expect(searchFeedResponse.data.length).toEqual(1);
    expect(searchFeedResponse.data[0].name).toBe(expectedResponseData.name);
    expect(searchFeedResponse.data[0].description).toBe(expectedResponseData.description);
  })


  it('5) feed controller: getFeedData() with key=The King (without quote)',async () => {
    const responseDataLimit = 20;
    const page = 0;
    const searchFeedResponse = await feedController.getFeedData('The King', page, responseDataLimit);
    const expectedResponseData = [{
        "name": "District Solutions Orchestrator",
        "image": "https://picsum.photos/640/480",
        "description": "Laboriosam occaecati modi sit voluptatem. Quis harum rerum similique at. The Lion King. Et porro eum quia eligendi doloribus aut. Tenetur provident maxime quod illum vitae excepturi. Nemo ipsum non.",
        "dateLastEdited": "2018-10-03T18:56:53.492Z"
    },
    {
        "name": "The Lord of the Rings: The Return of the King",
        "image": "https://picsum.photos/640/480",
        "description": "Nihil hic neque dignissimos totam omnis ut aut. Fugiat voluptatem rem quisquam provident est odit. Necessitatibus veniam architecto quia. Rerum deserunt reiciendis velit voluptatem tempora iusto similique. Atque mollitia pariatur quia voluptatem qui laborum laborum rerum molestias.",
        "dateLastEdited": "2018-08-06T08:27:26.187Z"
    },
    {
        "name": "Human Web Agent",
        "image": "https://picsum.photos/640/480",
        "description": "Vitae dolor natus aut aut. Totam dolor porro. Rem est repellendus voluptas eos soluta. The Lord of the Rings: The Return of the King",
        "dateLastEdited": "2018-04-16T09:57:36.659Z"
    },
    {
        "name": "The Lion King",
        "image": "https://picsum.photos/640/480",
        "description": "Fugiat praesentium aspernatur accusantium praesentium blanditiis modi. Ipsam dignissimos odio eum aut fugit aliquam error facilis explicabo. Voluptatum eaque ullam voluptate hic dolorem dolores ab quod. Incidunt consequatur nam et voluptatem reprehenderit quibusdam hic aut. Architecto voluptas numquam est natus quis. Reprehenderit eaque voluptas voluptas nihil cupiditate.",
        "dateLastEdited": "2017-12-28T04:21:00.923Z"
    }]
    console.log("searchFeedResponse: ", searchFeedResponse)
    expect(searchFeedResponse.data.length).toEqual(expectedResponseData.length);
  })

})
