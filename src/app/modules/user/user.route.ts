
import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { UserValidationSchema } from './user.validation';



const router = express.Router();

router.post('/register',ValidateRequest(UserValidationSchema),UserController.RegisterUser)

router.post('/login',UserController.loginUser)



export const UserRoutes = router;