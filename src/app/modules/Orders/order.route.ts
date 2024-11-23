

import express from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.post('/',OrderController.OrderCar);

router.get('/revenue',OrderController.RevenueOrder)

export const OrderRoutes = router


