import { Router } from 'express';

import usersRoutes from './users.routes';
import sectionsRoutes from './sections.routes';
import categoriesRoutes from './categories.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use('/sections', sectionsRoutes);
appRoutes.use('/categories', categoriesRoutes);

export default appRoutes;
