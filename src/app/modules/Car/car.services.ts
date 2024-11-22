import type { CarModel } from './car.interface';
import { CarModels } from './car.model';

const createCarIntoDB = async (Cardata: CarModel) => {
  const result = await CarModels.create(Cardata);
  return result;
};

export const CarServices = {
    createCarIntoDB
}
