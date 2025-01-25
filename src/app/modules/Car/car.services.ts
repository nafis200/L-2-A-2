import QueryBuilder from '../../builder/QueryBuilder';
import { SearchField } from './car.constant';
import type { CarModel } from './car.interface';
import { CarModels } from './car.model';
import { ObjectId } from 'mongodb';

const createCarIntoDB = async (Cardata: CarModel) => {
  const result = await CarModels.create(Cardata);
  return result;
};

const getAllCarFromDB = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(CarModels.find(), query)
    .search(SearchField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await carQuery.modelQuery;
  return result;
};

const getSingleCarFromDB = async (carId: string) => {
  const result = await CarModels.aggregate([
    {
      $match: { _id: new ObjectId(carId) },
    },
  ]);
  return result;
};

const getUpdateCarFromDB = async (carId: string, Cardata: object) => {
  const result = await CarModels.findByIdAndUpdate(
    carId,
    { ...Cardata, inStock: true}, 
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteCarFromDB = async (carId: string) => {
  const result = await CarModels.updateOne(
    { _id: new ObjectId(carId) },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  getUpdateCarFromDB,
  deleteCarFromDB,
};
