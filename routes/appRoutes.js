
import { Router, response } from 'express';
import cors from 'cors'
import { client, findOneInMongo } from '../mongoSetup/mongo_setup.js';
import BaseResponse from '../core/base_response.js';
import multer from 'multer';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import UserController from '../controller/userController.js';
import ImageController from '../controller/imageController.js';

const routes = new Router();


routes.get('/get-user', cors(), UserController.index);

routes.post('/update_user',cors(), UserController.modify);

routes.post('/upload_image', cors(), ImageController.store);

routes.get('/get_image', cors(), ImageController.index);

export default routes;


//sample API should return
/*
app.get('/', function(req, res, next) {
    const data = {
        "statusCode":200,
        "message": "success",
        "data": {
            "name": "beiu"
        }
    }
    res.json(data)
  });
 */
