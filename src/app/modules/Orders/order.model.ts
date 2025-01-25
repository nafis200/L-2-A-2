import { Schema, model } from 'mongoose';
import { OrderModel } from './order.interface';

const orderModelSchema = new Schema<OrderModel>(
    {
        email:{
            type:String,
            required:[true,"email is required"],
            trim:true
        },
        car:{
            type: Schema.Types.ObjectId,
            ref: "CarModel",
            required:[true,"CarId is required"],
        },
        quantity:{
            type:Number,
            required:true,
            min: 0
        },
        totalPrice:{
            type:Number,
            required:true,
            min: 0
        },
        status: {
            type: String,
            enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
            default: "Pending",
          },
          transaction: {
            id: String,
            transactionStatus: String,
            bank_status: String,
            sp_code: String,
            sp_message: String,
            method: String,
            date_time: String,
          },
    },
    {
        timestamps: true,
    },
)

export const OrderModels = model<OrderModel>('CarOrderModel', orderModelSchema);

