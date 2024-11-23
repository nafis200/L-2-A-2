import type { OrderModel } from './order.interface';
import { OrderModels } from './order.model';

const createOrderIntoDB = async (Orderdata: OrderModel) => {
  const result = await OrderModels.create(Orderdata);
  return result;
};
const getAllRevenue = async () => {
  const result = await OrderModels.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllRevenue,
};
