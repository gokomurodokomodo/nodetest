import { Router, response } from 'express';
import cors from 'cors'
import { client, findOneInMongo } from '../mongoSetup/mongo_setup.js';
import BaseResponse from '../core/base_response.js';
import multer from 'multer';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';

class ImageController {
    /**
     * Store image data in the database.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    async store(req, res) {
        try {
            console.log(req.get('Content-Type'));
            console.log(req.get('mineType'));
            console.log(req.body.mineType);

            const database = client.db("love_app");

            var finalImg = {
                name: req.body.name,
                contentType: req.body.mineType,
                image: new Buffer(JSON.stringify(req.body.imageDecode), 'base64')
            };

            const querry = { name: req.body.name };
            const findResult = await database.collection('image').findOne(querry);

            if (findResult != null) {
                await database.collection('image').deleteMany(querry);
            }

            const result = await database.collection('image').insertOne(finalImg, (err, result) => {
                console.log(result);
                if (err) return console.log(err);
                console.log('saved to database');
            });

            var tempResponse = new BaseResponse();
            tempResponse.setData(result);
            res.json(tempResponse);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * Retrieves an image from the database and sends it as a response.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    async index(req, res) {
        try {
            // Access the "love_app" database
            const database = client.db("love_app");

            // Define the query to find the image by name
            const query = { name: req.params.name };

            // Log the name of the image being requested
            console.log(req.params.name);

            // Find the image in the "image" collection
            const result = await database.collection('image').findOne(query);

            // Set the content type of the response to the image's content type
            res.contentType(result.contentType);

            // Send the image buffer as the response
            res.send(result.image.buffer);
        } catch (error) {
            // Log any errors that occur
            console.log(error);
        }
    }
    
}

export default new ImageController();