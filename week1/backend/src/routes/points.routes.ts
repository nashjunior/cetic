import { Router } from 'express';
import PointsController from '../controllers/PointsController';
import multerConfig from '../config/multer';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

const pointsRouter = Router();
const pointsController = new PointsController();

const upload = multer(multerConfig);

pointsRouter.get('/:id', pointsController.show);
pointsRouter.get('/', pointsController.index);
pointsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      item: Joi.string().required(),
    }),
  }),
  upload.single('image'),
  pointsController.post
);
export default pointsRouter;
