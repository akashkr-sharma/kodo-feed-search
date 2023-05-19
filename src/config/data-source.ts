import "reflect-metadata"
import { DataSource } from "typeorm"
import { Feed } from "../entity/Feed"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Feed],
    synchronize: true,
    logging: false,
    
})

export const createDBConnection = async() =>{
    return await new Promise<DataSource>((resolve, reject) => {
        AppDataSource.initialize().then(() => {
            return resolve(AppDataSource)
        }).catch((error) => {
            console.log(`error in creating the db connection: ${error.message}`)
            reject()
        })
    })
}


export const closeDBConnection =async () => {
    return await new Promise<void>((resolve, reject) => {
        AppDataSource.destroy().then(() => {
            resolve()
        }).catch((error) => {
            console.log(`error in destroying the db connection: ${error.message}`)
            reject()
        })
    })
}