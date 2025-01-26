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
  // const createdOrder = await OrderServices.createOrderIntoDB(req.body, req.ip!);
  const createdOrder = await OrderServices.createOrderIntoDB(ZodparseCardata, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order successfully done',
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

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await OrderServices.getOrders();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order retrieved successfully',
    data: order,
    success: true,
  });
});

export const OrderControllers = {
  OrderCar,
  RevenueOrder,
  verifyPayment,
  getOrders,
};
