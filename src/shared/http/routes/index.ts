import { Router } from 'express';

import usersRoutes from './users.routes';
import sectionsRoutes from './sections.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use('/sections', sectionsRoutes);

export default appRoutes;
