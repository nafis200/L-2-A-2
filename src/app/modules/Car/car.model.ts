import { Schema, model } from 'mongoose';
import type { CarModel } from './car.interface';

const CarModelSchema = new Schema<CarModel>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message:
          "Category must be one of 'Sedan', 'SUV','Truck', 'Coupe,','Convertible'",
      },
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'description must be required'],
      default: 'No description provide',
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

CarModelSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CarModelSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CarModelSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const CarModels = model<CarModel>('CarModel', CarModelSchema);
