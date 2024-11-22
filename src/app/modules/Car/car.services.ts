import type { CarModel } from './car.interface';
import { CarModels } from './car.model';
import { ObjectId } from 'mongodb';

const createCarIntoDB = async (Cardata: CarModel) => {
  const result = await CarModels.create(Cardata);
  return result;
};

const getAllCarFromDB = async()=>{
     const result = await CarModels.find()
     return result
}

const getSingleCarFromDB = async(carId:string)=>{
  
    
    const result = await CarModels.aggregate([
       {
        $match: { _id: new ObjectId(carId) }
       }
    ])  
    return result
}

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB
}
