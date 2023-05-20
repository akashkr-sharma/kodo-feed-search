import { Injectable } from '@nestjs/common';
import { Feed } from '../entity/Feed';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {seeder} from './seeders/feed.seeder';
import { FeedPageObject, Pagination } from './dto/feed.dto';

@Injectable()
export class FeedService {

    constructor(
        @InjectRepository(Feed)
        private feedRepository: Repository<Feed>,
    ) {}

    async runSeeder() {
        await seeder(this.feedRepository)
    }

    async getAllFeed() {
        const result = await this.feedRepository.find({order: {dateLastEdited: "DESC"}});
        const totalCount = await this.feedRepository.count();
        const pagination: Pagination = await this.getPaginationObject(totalCount, 0, totalCount);
        return this.createFeedPageObject(result, pagination);
    }

    
    feedQueryBuilder(key: string, page, limit) :FindManyOptions<Feed> {
        let query: FindManyOptions<Feed>;
        const offset = page*limit;

        query = {
            order: {
                dateLastEdited: "DESC"
            },
            skip: offset,
            take: limit
        }
        let keys: Array<string> = key.split("\"")

        if (!key || (keys.length>1 && !keys[1])){
            return query;
        }
        if (keys.length>1){
            query["where"] = {
                name: Like(`%${keys[1]}%`)
            }
        }else{
            keys = key.split(" ")
            let str: string = "";
            keys.forEach(key => {
                str+=`%${key}%`
            })
            query["where"] = [{
                name: Like(`%${str}%`)
            }, {
                description: Like(`%${str}%`)
            }]
        }
        return query
    }

    async getFeedObject(key: string, page: number, limit: number) : Promise<FeedPageObject> {
        
        
        const query: FindManyOptions<Feed> = this.feedQueryBuilder(key, page, limit);
        
        const result: Array<Feed> = await this.feedRepository.manager.getRepository(Feed).find(query)

        const totalCount = await this.feedRepository.manager.getRepository(Feed).count(query);
        const pagination: Pagination = await this.getPaginationObject(totalCount, page, limit);
        return this.createFeedPageObject(result, pagination);
    }


    async getPaginationObject(totalCount: number, page: number, limit: number) : Promise<Pagination> {
        const totalPage = Math.ceil(totalCount/limit)
        const paginationObject = new Pagination();
        paginationObject.page = page;
        paginationObject.totalPage = totalPage;
        return paginationObject;
    }

    createFeedPageObject(feeds: Feed[], pagination: Pagination): FeedPageObject {
        const feedPageObject = new FeedPageObject();
        feedPageObject.data = feeds;
        feedPageObject.pagination = pagination;
        return feedPageObject;
    }

}
