import { createToken } from './user.utils';
import { TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const RegisterUser = async (payload: TUser) => {
  if (!payload) {
    throw new AppError(404,'User is undefined or null');
  }

  const existingUser = await User.findOne({ email: payload.email });

  payload.role = 'user'

  if (existingUser) {
    throw new AppError(404,'Email already exist');
  }
  const user = await User.create(payload);
  const jwtPayload = {
    email: user?.email,
    role: "user",
  };



  const accessToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    String(config.jwt_access_expires_in)
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    String(config.jwt_access_expires_in)
  );

  return {
    accessToken,
    refreshToken,
  };
};


const loginUser = async (payload: TUser) => {



  const user = await User.isUserExistsByCustomId(payload.email);  

  
  if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"email is not register")
  }

  if(user.status === 'blocked'){
     throw new AppError(httpStatus.FORBIDDEN,"user is blocked")
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const jwtPayload = {
    email: user?.email ?? "default_email",      
    role: user?.role ?? "user",                     
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(email);


  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  
  // console.log(jwtPayload)

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};


const BlockedUser = async(id:string)=>{

  const result = await User.updateOne(
    { _id: new ObjectId(id) },
    {
      status:'blocked',
    },
  );
  return result;
}

const Alluser = async()=>{
   const result = await User.find()
   return result
}


export const UserServices = {
  RegisterUser,
  loginUser,
  refreshToken,
  BlockedUser,
  Alluser
};
