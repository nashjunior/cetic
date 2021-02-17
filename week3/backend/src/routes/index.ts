import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from '../controllers/OrphanagesController';
import multerConfig from '../config/upload';

const upload = multer(multerConfig);
const routes = Router();
/* const orphanagesController = new OrphanagesController();

routes.get('/orphanages', orphanagesController.index);
routes.get('/orphanages/:id', orphanagesController.show);
routes.post('/orphanages', upload.array('images'), orphanagesController.create);
 */
export default routes;
