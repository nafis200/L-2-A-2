

import express from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.post('/',OrderController.OrderCar);

export const OrderRoutes = router


