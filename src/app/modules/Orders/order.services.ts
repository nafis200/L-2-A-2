import QueryBuilder from '../../builder/QueryBuilder';
import type { OrderModel } from './order.interface';
import { OrderModels } from './order.model';
import { orderUtils } from './order.utils';

const createOrderIntoDB = async (Orderdata: OrderModel, client_ip?: string) => {
  const result = await OrderModels.create(Orderdata);

  const shurjopayPayload = {
    amount: Orderdata.totalPrice * Orderdata.quantity,
    order_id: result._id,
    car_id: Orderdata.car,
    currency: "BDT",
    customer_name: Orderdata.name,
    customer_email:Orderdata.email,
    customer_address: Orderdata.address,
    customer_phone: Orderdata.phone_number,
    customer_city: "Tongi",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  
  if (payment?.transactionStatus) {
    await OrderModels.findOneAndUpdate(
      { _id: result._id },
      {
        $set: {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        new: true, 
        upsert: true, 
      }
    );
  }
  

  

  return payment.checkout_url;
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

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModels.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },  
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

const getOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModels.find(),query)
  .filter()
  .sort()
  .paginate()
  .fields()

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal()

  return {
     result,
     meta
  }
};

// const carQuery = new QueryBuilder(CarModels.find(), query)
//     .search(SearchField)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();
//   const result = await carQuery.modelQuery;
//   const meta = await carQuery.countTotal();

//   return {
//      result,
//      meta
//   };

export const OrderServices = {
  createOrderIntoDB,
  getAllRevenue,
  verifyPayment,
  getOrders,
};




// {
//   email: 'customer@example.com',  
//   car: '6793bc7612b75e9b67e2e4bb',
//   quantity: 2,
//   totalPrice: 2,
//   status: 'Pending',
//   _id: new ObjectId('6794fb6984357f6b2477ce58'),
//   createdAt: 2025-01-25T14:55:37.485Z,
//   updatedAt: 2025-01-25T14:55:37.485Z,
//   __v: 0
// }