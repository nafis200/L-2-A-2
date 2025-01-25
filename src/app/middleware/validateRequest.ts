
import type { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

const ValidateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
     
        await schema.parseAsync({
          body: req.body,
          cookies:req.cookies,
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  };

  export default ValidateRequest