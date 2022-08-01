/* eslint-disable @typescript-eslint/no-empty-function */
import express from 'express';
import AccountUtils from '../../common/utils/AccountUtils'
import UserMiddleware from "../../middlewares/user/UserMiddleware";
import UserService from "../../services/UserService";
import RequestService from "../../services/RequestService";
import BaseResponseHandler from './BaseResponseHandler';
import Logger from '../../common/utils/Logger';
import { IUser } from '../../models/user/user';

abstract class BaseAccountController extends BaseResponseHandler {

    public router;
    protected accountUtils: AccountUtils;
    protected userService: UserService;
    protected userMiddleWare: UserMiddleware;
    protected requestService: RequestService;
    protected logger: Logger;


    constructor() {
        super();
        this.router = express.Router();
        this.accountUtils = new AccountUtils();
        this.userService = new UserService();
        this.userMiddleWare = new UserMiddleware(this.router);
        this.requestService = new RequestService(this.router);
        this.logger = new Logger();
        this.initServices();
        this.initMiddleware();
        this.initRoutes();
    }
    protected abstract initMiddleware():void;
    protected abstract initServices():void;
    protected abstract initRoutes():void;

    protected logError(err:Error) {
        this.logger.logError(err);
    }

    protected getSafeUserData(user:IUser) {
        return this.userService.getSafeUserData(user);
    }
}

export default BaseAccountController;
