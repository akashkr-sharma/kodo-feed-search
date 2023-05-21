import "reflect-metadata"
import { Feed } from "../entity/Feed"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"


export const Config: TypeOrmModuleOptions = {
    type: "sqlite",
    database: ":memory:",
    dropSchema: false,
    entities: [Feed],
    synchronize: true,
    logging: false,
}