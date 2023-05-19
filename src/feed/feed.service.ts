import { Injectable, NotFoundException } from '@nestjs/common';
import { Feed } from '../entity/Feed';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {seeder} from './seeders/feed.seeder';
import { FeedPageObject, Pagination } from './dto/feed.dto';

@Injectable()
export class FeedService {

    constructor(
        @InjectRepository(Feed)
        private feedRepository: Repository<Feed>,
    ) {
        seeder(feedRepository)
    }

    async getAllFeed() {
        const found = await this.feedRepository.find();
        const totalCount = await this.feedRepository.count();
        const pagination: Pagination = await this.getPaginationObject(totalCount, 0, totalCount);
        return this.createFeedPageObject(found, pagination);
    }

    async getFeedObject(key: string, page: number, limit: number) : Promise<FeedPageObject> {
        const offset = page*limit;
        let keys: Array<string> = key.split("\"")
        if (keys.length>1){

        }else{
            keys = key.split(" ")
            console.log("keys: ", keys)
        }


        const found = []
        if (!found) {
            throw new NotFoundException('No data found');
        }
        const totalCount = await this.feedRepository.count();
        const pagination: Pagination = await this.getPaginationObject(totalCount, page, limit);
        return this.createFeedPageObject(found, pagination);
    }


    async getPaginationObject(totalCount: number, page: number, limit: number) : Promise<Pagination> {
        const totalPage = Math.floor(totalCount/limit)
        const paginationObject = new Pagination();
        paginationObject.page = page;
        paginationObject.totalPage = totalPage;
        return paginationObject;
    }

    createFeedPageObject(feeds: Feed[], pagination: Pagination): FeedPageObject {
        const feedPageObject = new FeedPageObject();
        feedPageObject.feeds = feeds;
        feedPageObject.pagination = pagination;
        return feedPageObject;
    }

}
