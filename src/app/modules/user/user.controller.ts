import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
const RegisterUser = catchAsync(async (req, res) => {
    const result = await UserServices.RegisterUser(req.body);
    const { refreshToken,  accessToken } = result;
  
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is Register in succesfully!",
      data: {
        accessToken,
      },
    });
  });

  const loginUser = catchAsync(async (req, res) => {
    const result = await UserServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
  
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is logged in succesfully!",
      data: {
        accessToken,
      },
    });
  });

  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await UserServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });

  const BlockedUser = catchAsync(async(req,res)=>{

     const {carId} = req.params
     const result = await UserServices.BlockedUser(carId)
     sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is blocked',
      data: result,
    });
  })

  const AllUser = catchAsync(async(req,res)=>{
    const result = await UserServices.Alluser()
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'User is retrived',
     data: result,
   });
  })

  const changePassword = catchAsync(async (req, res) => {
    
    const { ...passwordData } = req.body;
  
      
    const result = await UserServices.changePassword(req.user!, passwordData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password is updated succesfully!',
      data: result,
    });
  });

  

  export const UserController = {
    RegisterUser,
    loginUser,
    refreshToken,
    BlockedUser,
    AllUser,
    changePassword
  };