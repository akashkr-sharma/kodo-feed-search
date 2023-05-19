import { IsString, IsUrl, IsOptional, IsDate } from "class-validator";
import { Feed } from "../../entity/Feed";

export class FeedCreationDto {
    @IsString()
    name: string;

    @IsUrl()
    @IsOptional()
    image: string;

    @IsString()
    description: string;

    @IsDate()
    dateLastEdited: Date;

    constructor({name, description, image, dateLastEdited}) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.dateLastEdited = new Date(dateLastEdited);
    }
}


export class Pagination {
    page: number;
    totalPage: number;
}


export class FeedPageObject {
    feeds: Feed[];

    pagination: Pagination;
}