import type { Request, Response } from 'express';
import { z } from 'zod';
import { OrderValidationSchema } from './order.validation';
import { OrderServices } from './order.services';
import { CarServices } from '../Car/car.services';

type OrderDataType = z.infer<typeof OrderValidationSchema>;

export const OrderCar = async (req: Request, res: Response) => {
  try {
    const Orderdata: OrderDataType = req.body;
    const ZodparseCardata = OrderValidationSchema.parse(Orderdata);

    const { quantity: orderQuantity, car, totalPrice } = ZodparseCardata;

    
  
    const carDataArray = await CarServices.getSingleCarFromDB(car);

    if (!carDataArray || carDataArray.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No data found for this car ID',
      });
      return;
    }

    const carData = carDataArray[0];

    const { quantity, inStock } = carData;

    if (!inStock || quantity < orderQuantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
      return;
    }

    carData.quantity -= orderQuantity;
    carData.price = (orderQuantity * totalPrice)

    if (carData.quantity === 0) {
      carData.inStock = false;
    }

    const updatedCarData = await CarServices.getUpdateCarFromDB(car, carData);
    const createdOrder = await OrderServices.createOrderIntoDB(ZodparseCardata);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: createdOrder,
      updatedCarData,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const RevenueOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderServices.getAllRevenue();

    if (!result || result.length === 0 || !result[0]?.totalRevenue) {
      res.status(404).json({
        success: false,
        message: 'No revenue data found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue: result[0].totalRevenue,
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const OrderControllers = {
  OrderCar,
  RevenueOrder,
};
