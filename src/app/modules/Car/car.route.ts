
import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post('/',CarControllers.createCar);

router.get('/',CarControllers.getAllCar)

export const CarRoutes = router