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

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);
    if (result.length !== 0) {
      res.status(200).json({
        success: true,
        message: 'Car retrieved successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Not found Please give me valid id',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const UpdateSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const Cardata = req.body;
    const result = await CarServices.getUpdateCarFromDB(carId, Cardata);

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Car updated successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Id nnt found',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getDeleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params; 
    const result = await CarServices.deleteCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'CarData is deleted successfully',
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
  getAllCar,
  getSingleCar,
  UpdateSingleCar,
  getDeleteCar,
};
