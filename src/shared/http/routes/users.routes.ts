import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.post('/', (request, response) => {
    return response.json('Create Users');
});

export default usersRoutes;
