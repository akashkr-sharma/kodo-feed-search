import { Injectable } from '@nestjs/common';
import { FeedDto, FeedPageObject, Pagination } from './dto/feed.dto';
import { FeedRepository } from './feed.repository';

@Injectable()
export class FeedService {

    constructor(private readonly feedRepository: FeedRepository) {}

    /**
     * this will return all the feed data 
     */
    async getAllFeed() {
        const result = this.feedRepository.findAll();
        const totalCount = result.length
        const pagination: Pagination = await this.getPaginationObject(totalCount, 0, totalCount);
        return this.createFeedPageObject(result, pagination);
    }

    /**
     * 
     * @param key 
     * based on the search regex pattern will be created 
     * @returns 
     */
    feedQueryBuilder(key: string) {
        let pattern: RegExp = RegExp("");
        let words: Array<string> = []

        let keys: Array<string> = key.split("\"")

        if (!key || (keys.length>1 && !keys[1])){
            return {pattern, words};
        }
        if (keys.length>1){
            pattern = RegExp(`(${keys[1]})`, "gi")
            words.push(keys[1]);
        }else{
            words = keys[0].split(" ")
            const str = `(\\b(${words.join("|")})\\b)`
            pattern = RegExp(str, "gi")
        }
        return {pattern, words}
    }

    async getFeedObject(key: string, page: number, limit: number) : Promise<FeedPageObject> {
        const offset = page*limit;
        const query = this.feedQueryBuilder(key)
        const {pattern, words} = query;

        const fields = ["name", "description"];
        const result: Array<FeedDto> = this.feedRepository.find(pattern, words, fields, true)

        const totalCount = result.length;

        const pagination: Pagination = await this.getPaginationObject(totalCount, page, limit);
        return this.createFeedPageObject(result.splice(offset, limit), pagination);
    }


    async getPaginationObject(totalCount: number, page: number, limit: number) : Promise<Pagination> {
        const totalPage = Math.ceil(totalCount/limit)
        const paginationObject = new Pagination();
        paginationObject.page = page;
        paginationObject.totalPage = totalPage;
        return paginationObject;
    }

    createFeedPageObject(feeds: FeedDto[], pagination: Pagination): FeedPageObject {
        const feedPageObject = new FeedPageObject();
        feedPageObject.data = feeds;
        feedPageObject.pagination = pagination;
        return feedPageObject;
    }

}
