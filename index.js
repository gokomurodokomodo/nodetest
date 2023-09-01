import express from 'express'
import cors from 'cors'
import routes from './routes/appRoutes.js';
import { corsMiddleware } from './middleware/corsmiddleware.js';
import { run } from './mongoSetup/mongo_setup.js';
import multer from 'multer';
import bodyParser from 'body-parser';

var form = multer()



const app = express()
const port = 3000
app.use(express.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({
    origin: '*'
}))
app.options('/user', cors())
app.use("/user", routes)

app.use(corsMiddleware);

app.listen(port, async() => {
    await run().catch(console.dir);
    console.log(`Example app listening on port ${port}!`)
})
