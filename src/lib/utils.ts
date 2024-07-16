import { MongoClient } from "mongodb"
import mongoose, { Mongoose } from "mongoose"
interface LooseObject {
    [key: string]: any
}
const connection:LooseObject = {}

type MongoClientType = MongoClient | mongoose.mongo.MongoClient
let client:MongoClientType

let globlaWithMongo = global as typeof globalThis & {
    _mongooseClient: Mongoose
}

// try {
//     if(connection.isConnected) {
//         return
//     }
//     const db = await mongoose.connect(process.env.MONGODB! as string,{
//         dbName:"foodya",
//         bufferCommands: true,
//     })
//     connection.isConnected = db.connections[0].readyState
// } catch (error) {
//     console.log(error)
//     throw new Error('Failed to connect to database')
// }
export const connectToDB = async () => {
    if(process.env.NODE_ENV === 'development') {
        if(!globlaWithMongo._mongooseClient) {
            globlaWithMongo._mongooseClient = await mongoose.connect(process.env.MONGODB! as string, {
                        dbName:"foodya",
                        bufferCommands: true,
                    })
        }
        client = globlaWithMongo._mongooseClient.connection.getClient()
    }else{
        let _client = await mongoose.connect(process.env.MONGODB! as string, {
            dbName:"foodya",
            bufferCommands: true,
        })
        client = _client.connection.getClient()
    }
}

export const clientPromise = async () => {
    await connectToDB()
    return Promise.resolve<MongoClientType>(client)
}