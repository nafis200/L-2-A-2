import type { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { OrderServices } from './order.services';
import { CarServices } from '../Car/car.services';
import type { RequestHandler } from 'express';

const OrderCar:RequestHandler = async (req: Request, res: Response) => {
  try {
    const Orderdata = req.body;
    const ZodparseCardata = OrderValidationSchema.parse(Orderdata);

    const { quantity: orderQuantity, car } = Orderdata;

    const carDataArray = await CarServices.getSingleCarFromDB(car);

    if (!carDataArray || carDataArray.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found for this car ID",
      });
    }

    const carData = carDataArray[0];

    const { quantity, inStock } = carData;

    if (!inStock || quantity < orderQuantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    carData.quantity -= orderQuantity;

    if (carData.quantity === 0) {
      carData.inStock = false;
    }

    const result2 = await CarServices.getUpdateCarFromDB(car,carData)

    const result = await OrderServices.createOrderIntoDB(ZodparseCardata);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
      data1:result2
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

export const OrderController = {
  OrderCar,
};
