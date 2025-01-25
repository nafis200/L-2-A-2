

import express from 'express';
import { OrderControllers } from './order.controller';



const router = express.Router();

router.post('/',OrderControllers.OrderCar);

router.get('/verify',OrderControllers.verifyPayment)

router.get('/revenue',OrderControllers.RevenueOrder)
router.get('/Allorder',OrderControllers.getOrders)

export const OrderRoutes = router


