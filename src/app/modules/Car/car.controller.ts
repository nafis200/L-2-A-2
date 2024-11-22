import type { Request, Response } from "express";
import { CarServices } from "./car.services";


const createCar = async(req:Request, res:Response)=>{
    
     try{
        const Cardata = req.body;
        const result = await CarServices.createCarIntoDB(Cardata)
        res.status(200).json({
            success: true,
            message: 'Car created successfully',
            data: result,
          });
     }
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error,
          });
     }

}

export const CarControllers = {
    createCar
}