import { Router } from 'express';

import usersRoutes from './users.routes';
import sectionsRoutes from './sections.routes';
import categoriesRoutes from './categories.routes';
import productsRoutes from './products.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use('/sections', sectionsRoutes);
appRoutes.use('/categories', categoriesRoutes);
appRoutes.use('/products', productsRoutes);

export default appRoutes;
