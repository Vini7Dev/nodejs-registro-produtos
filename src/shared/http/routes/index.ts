import { Router } from 'express';

import usersRoutes from './users.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);

export default appRoutes;
