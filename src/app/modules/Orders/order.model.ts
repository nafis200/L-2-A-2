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
            type: String,
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
        name: {
            type: String,
            default:"unknown"
        },
        phone_number: {
            type: String,
            default:"019 xxx xxx"
        },
        address: {
            type: String,
            default:"Dhaka bangladesh"
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

