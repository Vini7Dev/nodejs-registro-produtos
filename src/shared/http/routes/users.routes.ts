import { Router } from 'express';

import UsersController from '../../../modules/users/controllers/UsersController';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);

export default usersRoutes;
