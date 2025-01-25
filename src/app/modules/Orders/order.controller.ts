import { z } from 'zod';
import { OrderValidationSchema } from './order.validation';
import { OrderServices } from './order.services';
import { CarServices } from '../Car/car.services';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

type OrderDataType = z.infer<typeof OrderValidationSchema>;

export const OrderCar = catchAsync(async (req, res) => {
  const Orderdata: OrderDataType = req.body;
  const ZodparseCardata = OrderValidationSchema.parse(Orderdata);

  const { quantity: orderQuantity, car, totalPrice } = ZodparseCardata;

  const carDataArray = await CarServices.getSingleCarFromDB(car);

  if (!carDataArray || carDataArray.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No data found for this car ID',
      data: [
        {
          message: 'No data found for this car',
        },
      ],
    });
    return;
  }

  const carData = carDataArray[0];

  const { quantity, inStock } = carData;

  if (!inStock || quantity < orderQuantity) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Insufficient stock',
      data: [
        {
          message: 'Insufficient stock',
        },
      ],
    });
    return;
  }

  carData.quantity -= orderQuantity;
  carData.price = orderQuantity * totalPrice;

  if (carData.quantity === 0) {
    carData.inStock = false;
  }

  const updatedCarData = await CarServices.getUpdateCarFromDB(car, carData);
  const createdOrder = await OrderServices.createOrderIntoDB(ZodparseCardata);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: [updatedCarData, createdOrder],
  });
});

export const RevenueOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllRevenue();

  if (!result || result.length === 0 || !result[0]?.totalRevenue) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No revenue data found',
      data: [
        {
          message: 'No revenue data found',
        },
      ],
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Revenue calculated successfully',
    data: {
      totalRevenue: result[0].totalRevenue,
    },
  });
});

export const OrderControllers = {
  OrderCar,
  RevenueOrder,
};
