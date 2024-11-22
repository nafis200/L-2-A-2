
import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post('/',CarControllers.createCar);

router.get('/',CarControllers.getAllCar)

router.get('/:carId',CarControllers.getSingleCar)

router.put('/:carId',CarControllers.UpdateSingleCar)

router.delete('/:carId',CarControllers.getDeleteCar)

export const CarRoutes = router