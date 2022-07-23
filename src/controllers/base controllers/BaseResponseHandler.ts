import LoggerService from "../../common/utils/Logger";
import { Response } from "express";
import mongoose from "mongoose";
import { IResponseMessage } from "../../common/interfaces";
import ErrorResponseMessage from "../../common/constants/ErrorResponseMessage";
import SuccessResponseMessage from "../../common/constants/SucessResponseMessage";

abstract class BaseResponseHandler {

    protected errorResponseMessage: ErrorResponseMessage;
    protected successResponseMessage: SuccessResponseMessage;
    protected loggerService: LoggerService;

    constructor() {
        this.errorResponseMessage = new ErrorResponseMessage();
        this.successResponseMessage = new SuccessResponseMessage();
        this.loggerService = new LoggerService();
    }
    
    protected sendErrorResponse( res: Response, err: Error, responseMessage: IResponseMessage, statusCode: number) {

        let status = 400;
        let response;
        if (err instanceof mongoose.Error.ValidationError) {
            response = {
                message: err.message,
                success: false,
                error_code: 0
            };
        } else {
            response = {
                message: responseMessage.message,
                success: false,
                error_code: responseMessage.response_code
            };
            status = statusCode;
        }

        this.loggerService.logError(err);
        res.status(status).json(response);
    }

    protected sendSuccessResponse(res: Response, data = {}, statusCode = 200) {
        const response = {
            success: true,
            data: data
        }
        res.status(statusCode).json(response);
    }
}

export default BaseResponseHandler;
