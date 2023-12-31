import { MongoClient, ServerApiVersion } from 'mongodb';
import MongoConnectString from '../static_variable/mongo_connect_string.js';

const client = new MongoClient(MongoConnectString.MONGO_CONNECTION_STRING, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
      // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(e){
        console.log(e.toString())
    }
}

async function insertOneToMongo(file, collection){
    try{
        collection.insertOne(file);
    } catch(error){
        console.log("Failed to insert file: " + error);
    }
}

async function insertManyToMongo(file, collection, option){
    try{
        collection.insertMany(file, option);
    } catch(error){
        console.log("Failed to insert file: " + error);
    }
}


async function findOneInMongo(collection, value){
    try {
        collection.findOne({}, function(err,res){
            if(err) console.log(err)
            console.log(res)
        })
    } catch (error) {
        console.log(err)
    }
}

export {client, run, insertOneToMongo, insertManyToMongo, findOneInMongo}