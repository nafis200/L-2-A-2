
import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { refreshTokenValidationSchema, UserValidationSchema } from './user.validation';



const router = express.Router();

router.post('/register',ValidateRequest(UserValidationSchema),UserController.RegisterUser)

router.post('/login',UserController.loginUser)

router.post(
    '/refresh-token',
    ValidateRequest(refreshTokenValidationSchema),
    UserController.refreshToken
  );


export const UserRoutes = router;