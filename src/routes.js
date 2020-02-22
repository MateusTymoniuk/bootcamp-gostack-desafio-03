import { Router } from 'express';

import multer from 'multer';
import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliverymanDeliveryController.index);

routes.post(
  '/deliveryman/:id/deliveries/:delivery_id',
  DeliverymanDeliveryController.store
);

routes.put(
  '/deliveryman/:id/deliveries/:delivery_id',
  upload.single('file'),
  DeliverymanDeliveryController.update
);

routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.index);

routes.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);

routes.post('/recipients', RecipientController.store);

routes.put('/recipients/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliveryman', DeliverymanController.index);

routes.post('/deliveryman', DeliverymanController.store);

routes.put('/deliveryman/:id', DeliverymanController.update);

routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);

routes.post('/deliveries', DeliveryController.store);

routes.put('/deliveries/:id', DeliveryController.update);

routes.delete('/deliveries/:id', DeliveryController.delete);

routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
