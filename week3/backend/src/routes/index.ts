import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from '../controllers/OrphanagesController';
import multerConfig from '../config/upload';

const upload = multer(multerConfig);
const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;
