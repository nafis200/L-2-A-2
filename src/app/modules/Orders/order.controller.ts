import type { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { OrderServices } from './order.services';

const OrderCar = async (req: Request, res: Response) => {
  try {
    const Orderdata = req.body;

    const ZodparseCardata = OrderValidationSchema.parse(Orderdata);

    const result = await OrderServices.createOrderIntoDB(ZodparseCardata);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(500).json({
      success: false,
      message: error.error || 'something went wrong',
      error: error,
    });
  }
};

export const OrderController = {
  OrderCar,
};
