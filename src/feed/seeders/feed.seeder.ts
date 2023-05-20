import feedData from "../../../data/mock_data.json";
import { FeedCreationDto } from "../dto/feed.dto";

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from "../../entity/Feed";

@Injectable()
export class FeedSeeder {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async seed() {
    for (const feed of feedData) {
      const feedObject = this.feedRepository.create(feed);
      await this.feedRepository.save(feedObject);
    }
    const count = await this.feedRepository.count();
    console.log('seed successfully run: ', count);
  }
}


export const seeder = async(feedRepository) => {
    for(let i=0; i<feedData.length; i++){
        const feed = feedData[i]
        await feedRepository.insert(new FeedCreationDto(feed))
    }
    const count = await feedRepository.count()
    console.log("seeding complete: ", count)
    
}



