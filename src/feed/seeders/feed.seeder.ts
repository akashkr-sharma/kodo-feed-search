import feedData from "../../../data/mock_data.json";
import { FeedCreationDto } from "../dto/feed.dto";




export const seeder = async(feedRepository) => {
    for(let i=0; i<feedData.length; i++){
        const feed = feedData[i]
        await feedRepository.insert(new FeedCreationDto(feed))
    }
    const count = await feedRepository.count()
    console.log("seeding complete: ", count)
    
}