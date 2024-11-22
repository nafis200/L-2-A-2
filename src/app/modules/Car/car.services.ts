import type { CarModel } from './car.interface';
import { CarModels } from './car.model';

const createCarIntoDB = async (Cardata: CarModel) => {
  const result = await CarModels.create(Cardata);
  return result;
};

const getAllCarFromDB = async()=>{
     const result = await CarModels.find()
     return result
}

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB
}
