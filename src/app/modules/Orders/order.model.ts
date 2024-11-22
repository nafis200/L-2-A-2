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
            type:String,
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
        }
    },
    {
        timestamps: true,
    },
)

export const OrderModels = model<OrderModel>('CarOrderModel', orderModelSchema);

