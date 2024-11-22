import type { Request, Response } from 'express';
import { CarServices } from './car.services';
import { CarModelValidationSchema } from './car.validation';

const createCar = async (req: Request, res: Response) => {
  try {
    const Cardata = req.body;

    const ZodparseCardata = CarModelValidationSchema.parse(Cardata);

    const result = await CarServices.createCarIntoDB(ZodparseCardata);
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(500).json({
      success: false,
      message: error.error || 'something went wrong',
      error: error,
    });
  }
};

const getAllCar = async (req: Request, res: Response) => {
  try {
    
    const result = await CarServices.getAllCarFromDB();
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const CarControllers = {
  createCar,
  getAllCar
};
