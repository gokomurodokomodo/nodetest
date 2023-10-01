
import { Router, response } from 'express';
import cors from 'cors'
import { client, findOneInMongo } from '../mongoSetup/mongo_setup.js';
import BaseResponse from '../core/base_response.js';
import multer from 'multer';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';


class UserController {
  async index(req, res) {
    try {
        console.log(req.query.name)
        const database = client.db("love_app")
        const collection = database.collection("user")
        const querry = { name : req.params.name}
        const result = await collection.findOne(querry)
        console.log(result)
        var tempResponse = new BaseResponse()
        tempResponse.setData(result)
        res.json(tempResponse)
    } catch (error) {
        res.status(500).send(error.message)
    }
  }

  async modify(req, res){
    try {
        console.log(req.query.name)
        const database = client.db("love_app")
        const collection = database.collection("user")
        const updateDoc ={
            $set:{
                displayName : req.query.displayName
            }
        }
        const filter = { name : req.query.name}
        const result = await collection.updateOne(filter, updateDoc)
        var tempResponse = new BaseResponse()
        tempResponse.setMessage('success')
        res.json(tempResponse)
    } catch (error) {
        res.status(500).send(error.message)
    }
  }
}

export default new UserController();
