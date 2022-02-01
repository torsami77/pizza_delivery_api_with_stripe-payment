import { Response } from 'express';

const messages = {
    signUp: {
      success: 'learner created successfully',
      error: 'Could not sign up user try again',
      conflict: 'User with that email already exist'
    },
    signIn: {
      success: 'Successfully Signed In',
      notfound: 'User Cannot be found',
      error: 'Could not sign in user try again',
      invalid: 'Invalid Credentials',
      unverified: 'Email not verified, check your mail to verify'
    },
  };
    
  const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
    unprocessable: 422,
  };
    
  const forgeResponse = (res: Response, statusCode: number, message: string, data:any, token:string|null) => {
    interface ResponseTypes {
      statusCode:Number,
      message:string,
      data:any,
      token:any|null,
    };

    const response: ResponseTypes = {
        statusCode,
        message,
        data,
        token,
    }
    
    if (!data) delete response.data;
    if (!data && !token) delete response.token;
    
    return res.status(statusCode).json(response);
  };
    
  const successResponse = (res:Response, statusCode:number, message:string, userData:any, token:any) => forgeResponse(res, statusCode, message, userData, token);
    
  const errorResponse = (res:Response, statusCode:number, message:string, data = null, token = null) => forgeResponse(res, statusCode, message, data, token);
    
  const conflictResponse = (res:Response, statusCode:number, message:string, data = null, token = null) => forgeResponse(res, statusCode, message, data, token);
    
  export {
    status,
    successResponse,
    errorResponse,
    messages,
    conflictResponse,
  };