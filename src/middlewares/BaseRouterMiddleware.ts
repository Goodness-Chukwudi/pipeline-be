import UserService from "../services/UserService";
import RequestService from "../services/RequestService";
import BaseResponseHandler from "../controllers/base controllers/BaseResponseHandler";
import { Router } from "express";
import ErrorResponseMessage from "../common/constants/ErrorResponseMessage";
import SuccessResponseMessage from "../common/constants/SucessResponseMessage";

abstract class BaseRouterMiddleware extends BaseResponseHandler {

    public router;
    protected userService: UserService;
    protected requestService: RequestService;
    protected errorResponseMessage: ErrorResponseMessage;
    protected successResponseMessage: SuccessResponseMessage;


    constructor(appRouter: Router) {
        super();
        this.router = appRouter;
        this.userService = new UserService();
        this.requestService = new RequestService(this.router);
        this.initServices();
    }

    protected abstract initServices():void;
    
}

export default BaseRouterMiddleware;
