import type { OrderModel } from "./order.interface";
import { OrderModels } from "./order.model";


const createOrderIntoDB = async (Orderdata:OrderModel) => {
    const result = await OrderModels.create(Orderdata);
    return result;
  };


  export const OrderServices = {
     createOrderIntoDB
  }