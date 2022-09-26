import AccountUtils from "../common/utils/AccountUtils";
import BaseRouterMiddleware from "./BaseRouterMiddleware";
import { USER_LABEL, USER_STATUS } from "../common/constants/AppConstants";
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
        this.loginSessionService = new LoginSessionService(["user"]);
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

                this.loginSessionService.findOneWithPopulate(query)
                    .then(async (loginSession) => {
                        if (loginSession?._id) {
                            if (loginSession.validity_end_date <= new Date()) {
                                loginSession.expired = true;
                                loginSession.status = BIT.OFF;
                                await loginSession.save();
                                const error = new Error("Session expired");
                                return this.sendErrorResponse(res, error, this.errorResponseMessage.SESSION_EXPIRED, 401);
                            }
                            
                            this.checkUserStatus(res);
                            const user = loginSession.user;
                            if (user.require_new_password) {
                                const error = new Error("Password update required");
                                return this.sendErrorResponse(res, error, this.errorResponseMessage.PASSWORD_UPDATE_REQUIRED, 401);
                            }

                            this.requestService.addToDataBag(USER_LABEL, user);
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

    checkUserStatus(res: Response) {
        const user: any = this.requestService.getFromDataBag(USER_LABEL) || {};
        const status = user.status;
        switch(status) {
            case USER_STATUS.SUSPENDED:
            case USER_STATUS.DEACTIVATED: {
               return this.sendErrorResponse( res, new Error("Account blocked"), this.errorResponseMessage.ACCOUNT_BLOCKED, 403 );
            }

            case null: {
                return this.sendErrorResponse(res, new Error("Invalid user status"), this.errorResponseMessage.CONTACT_ADMIN, 404)
            }
        }
    }
}

export default AuthMiddleware;
