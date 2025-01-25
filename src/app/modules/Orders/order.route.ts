

import express from 'express';
import { OrderControllers } from './order.controller';



const router = express.Router();

router.post('/',OrderControllers.OrderCar);

router.get('/verify',OrderControllers.verifyPayment)

router.get('/revenue',OrderControllers.RevenueOrder)

export const OrderRoutes = router


