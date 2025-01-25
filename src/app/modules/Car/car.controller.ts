import { CarServices } from './car.services';
import { CarModelUpdateValidationSchema, CarModelValidationSchema } from './car.validation';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
const createCar = catchAsync(async (req, res) => {
  const Cardata = req.body;

  const ZodparseCardata = CarModelValidationSchema.parse(Cardata);

  const result = await CarServices.createCarIntoDB(ZodparseCardata);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCar = catchAsync(async (req, res) => {
 

  const result = await CarServices.getAllCarFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Get successfully',
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.getSingleCarFromDB(carId);
  if (result.length !== 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: true,
      message: 'Not found Please give me valid id',
      data: result,
    });
  }
});

const UpdateSingleCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const Cardata = req.body;
  const ZodparseCardata = CarModelUpdateValidationSchema.parse(Cardata);
  const result = await CarServices.getUpdateCarFromDB(carId, ZodparseCardata);

  if (result !== null) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car updated successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Id not found',
      data: result,
    });
  }
});



const getDeleteCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.deleteCarFromDB(carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CarData is deleted successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCar,
  getSingleCar,
  UpdateSingleCar,
  getDeleteCar,
};
