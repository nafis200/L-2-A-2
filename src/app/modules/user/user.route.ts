
import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { changePasswordValidationSchema, refreshTokenValidationSchema, UserValidationSchema } from './user.validation';
import auth from '../../middleware/auth';



const router = express.Router();

router.post('/register',ValidateRequest(UserValidationSchema),UserController.RegisterUser)

router.post('/login',UserController.loginUser)

router.post(
    '/refresh-token',
    ValidateRequest(refreshTokenValidationSchema),
    UserController.refreshToken
  );

router.put('/:carId',auth("admin"),UserController.BlockedUser)

router.get('/alluser',UserController.AllUser)

router.post(
  '/change-password',auth("admin","user"),
  ValidateRequest(changePasswordValidationSchema),
  UserController.changePassword,
);



export const UserRoutes = router;