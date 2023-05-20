import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import feedData from '../data/mock_data.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });


  it('/feed (GET)', () => {
    return request(app.getHttpServer())
      .get('/feed')
      .expect(200)
  });

  it('/feed total response count (GET)', async() => {
    const res = await request(app.getHttpServer()).get('/feed')
    expect(res.type).toEqual('application/json')
    expect(res.body.data.length).toEqual(feedData.length)
  });

  it('/feed/search check for invalid page response (GET)',async () => {
    const res = await request(app.getHttpServer()).get('/feed')

    const apiResponseLimit = 20
    const invalidPage = Math.ceil(res.body.data.length/apiResponseLimit);
    const searchResult = await request(app.getHttpServer()).get(`/feed/search?page=${invalidPage}&limit=${apiResponseLimit}`)
    expect(searchResult.body.data.length).not.toEqual(apiResponseLimit)
  })

  it('/feed/search response count (GET)', async() => {
    const responseDataLimit = 20;
    const res = await request(app.getHttpServer()).get('/feed/search?page=0&limit=20')
    expect(res.type).toEqual('application/json')
    expect(res.body.data.length).toEqual(responseDataLimit)
  });


  it('/feed/search with key="The King" (with quote)',async () => {
    const res = await request(app.getHttpServer()).get('/feed/search?key="The King"&page=0')
    const expectedResponseData = {
        "name": "The Lord of the Rings: The Return of the King",
        "image": "https://picsum.photos/640/480",
        "description": "Nihil hic neque dignissimos totam omnis ut aut. Fugiat voluptatem rem quisquam provident est odit. Necessitatibus veniam architecto quia. Rerum deserunt reiciendis velit voluptatem tempora iusto similique. Atque mollitia pariatur quia voluptatem qui laborum laborum rerum molestias.",
        "dateLastEdited": "2018-08-06T08:27:26.187Z"
    }
    expect(res.body.data.length).toEqual(1);
    expect(res.body.data[0].name).toBe(expectedResponseData.name);
    expect(res.body.data[0].description).toBe(expectedResponseData.description);
  })


  it('/feed/search with key=The King (without quote)',async () => {
    const res = await request(app.getHttpServer()).get('/feed/search?key=The King&page=0')
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
    expect(res.body.data.length).toEqual(expectedResponseData.length);
  })

});
