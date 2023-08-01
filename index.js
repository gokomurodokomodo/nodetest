import express from 'express'
import routes from './routes/appRoutes.js'
import {run} from './mongoSetup/mongo_setup.js';

run().catch(console.dir);



const app = express()
const port = 3000

app.use("/", routes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
