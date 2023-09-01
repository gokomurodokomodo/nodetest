import { Router, response } from 'express';
import cors from 'cors'
import { client, findOneInMongo } from '../mongoSetup/mongo_setup.js';
import BaseResponse from '../core/base_response.js';
import multer from 'multer';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';

class ImageController {
    async store(req, res) {
        try {
            console.log(req.get('Content-Type'))
            console.log(req.get('mineType'))
            console.log(req.body.mineType)
            const database = client.db("love_app")
            var finalImg = {
                name: req.body.name,
                contentType: req.body.mineType,
                image:  new Buffer(JSON.stringify(req.body.imageDecode), 'base64')
            };
            
            const querry = {name : req.body.name}
            const findResult = database.collection('image').findOne(querry);
            if(findResult != null) {
                database.collection('image').deleteMany(querry);
            }
            const result = await database.collection('image').insertOne(finalImg, (err, result) => {
                console.log(result)
                if (err) return console.log(err)
                console.log('saved to database')
      })
        var tempResponse = new BaseResponse()
        tempResponse.setData(result)
        res.json(tempResponse)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    
    async index(req, res) {
        try {
            const database = client.db("love_app")
            const querry = {name : req.query.name}
            const result = await database.collection('image').findOne(querry);
            res.contentType(result.contentType);
            res.send(result.image.buffer)
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default new ImageController();