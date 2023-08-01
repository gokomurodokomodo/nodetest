
import { Router } from 'express';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

    routes.route("/:bookId").get((req, res) => {
        try {
            const id = req.params.bookId
            console.log(id)
            res.send(id) 
        } catch (error) {
            console.error(error);
        }
    })

export default routes;
