import { Router } from 'express';

import SectionsController from '../../../modules/users/controllers/SectionsController';

const sectionsController = new SectionsController();

const sectionsRoutes = Router();

sectionsRoutes.post('/', sectionsController.create);

export default sectionsRoutes;
