import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller("/feed")
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    @Get('/')
    getAllFeed() {
        return this.feedService.getAllFeed()
    }

    @Get("/search")
    getFeedData(
        @Query('key', new DefaultValuePipe("")) key: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ){
        console.log(key, page, limit)
        return this.feedService.getFeedObject(key, page, limit)
    }
}
