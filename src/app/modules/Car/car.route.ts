
import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post('/',CarControllers.createCar);

router.get('/',CarControllers.getAllCar)

router.get('/:carId',CarControllers.getSingleCar)

export const CarRoutes = router