import AccountUtils from "../common/utils/AccountUtils";
import BaseRouterMiddleware from "./BaseRouterMiddleware";
import { USER_LABEL } from "../common/constants/AppConstants";
import { Request, Response, Router } from "express";
import { BIT, LOGIN_SESSION_LABEL } from "../common/constants/AppConstants";
import LoginSessionService from "../services/LoginSessionService";

export class AuthMiddleware extends BaseRouterMiddleware {


    protected accountUtils: AccountUtils;
    protected loginSessionService: LoginSessionService;

    constructor(appRouter: Router) {
        super(appRouter);
    }

    protected initServices() {
        this.accountUtils = new AccountUtils();
        this.loginSessionService = new LoginSessionService();
    }

    public authGuard = (req: Request, res: Response, next: any) => {
        const payload = req.headers.authorization || '';
        let jwt = '';
        if (payload) {
            if (payload.split(" ").length > 1) {
                jwt = payload.split(" ")[1];
            }
        }
        
        this.accountUtils.verifyToken(jwt, (error, decoded) => {
            if (error) {
                return this.sendErrorResponse(res, error, this.errorResponseMessage.INVALID_TOKEN, 401);
            } else {
                const data = decoded.data || {};
                const query = { uuid: data.uuid, _id: data.id, user: data.user, status: BIT.ON };

                this.loginSessionService.findOne(query)
                    .then(async (loginSession) => {
                        if (loginSession?._id) {
                            // const currentDate = Date.now();
                            // const expiryDate = new Date(loginSession.validity_end_date).getTime();
                            // if (activeLoginSession.validity_end_date > new Date()) {

                            if (loginSession.validity_end_date <= new Date()) {
                                loginSession.expired = true;
                                await loginSession.save();
                                const error = new Error("Session expired");
                                return this.sendErrorResponse(res, error, this.errorResponseMessage.SESSION_EXPIRED, 401);
                            }

                            this.requestService.addToDataBag(USER_LABEL, loginSession.user);
                            this.requestService.addToDataBag(LOGIN_SESSION_LABEL, loginSession);
                            return next();

                        } else {
                            throw new Error("Unable to validate user from token");
                        }
                    })
                    .catch((error) => {
                            this.sendErrorResponse(res, error, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 401);
                    })
            }

        })
    }
}

export default AuthMiddleware;
