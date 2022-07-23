import AccountUtils from "../../common/utils/AccountUtils";
import BaseRouterMiddleware from "../BaseRouterMiddleware";
import { USER_STATUS, USER_LABEL } from '../../common/constants/AppConstants';
import { Request, Response, Router } from 'express';
import UserService from "../../services/UserService";
import bcrypt from "bcrypt";

class UserMiddleware extends BaseRouterMiddleware {

    private accountUtils: AccountUtils;

    constructor(appRouter: Router) {
        super(appRouter)
    }

    protected initServices() {
        this.accountUtils = new AccountUtils();
        this.userService = new UserService();

    }

    public loadUserToRequestByEmail = (req: Request, res: Response, next: any) => {
        const email = req.body.email;

        if (!email) {
            const error = new Error("Username is required");
            return this.sendErrorResponse(res, error, this.errorResponseMessage.USERNAME_REQUIRED, 400)
        }

        this.userService.findByEmail(email)
            .then((user) => {
                if (!user) {
                    return this.sendErrorResponse(res, new Error("User not found"), this.errorResponseMessage.INVALID_LOGIN, 400)
                }
                this.requestService.addToDataBag(USER_LABEL, user);
                next();
            })
            .catch((err) => {
                next();
            })
    }

    public checkUserStatus = (req: Request, res: Response, next: any) => {
        const user: any = this.requestService.getFromDataBag(USER_LABEL) || {};
        const status = user.status;
        switch(status) {
            case USER_STATUS.PENDING:
            case USER_STATUS.ACTIVE:
            case USER_STATUS.SELF_DEACTIVATED: {
               return next();
            }
            case USER_STATUS.SUSPENDED:
            case USER_STATUS.DEACTIVATED: {
               return this.sendErrorResponse( res, new Error("Account blocked"), this.errorResponseMessage.ACCOUNT_BLOCKED, 400 );
            }

            case null: {
                return this.sendErrorResponse(res, new Error("Invalid user status"), this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 404)
            }

            default: return this.sendErrorResponse( res, new Error("Account not found"), this.errorResponseMessage.CONTACT_ADMIN, 404 );
        }
    }

    public hashNewPassword = async (req: Request, res: Response, next: any) => {
        if (req.body.password) {
            req.body.password = await this.accountUtils.hashData(req.body.password);
            next();
        } else {
            const error  =  new Error("No password provided");
            return this.sendErrorResponse(res, error, this.errorResponseMessage.PASSWORD_REQUIRED, 400)
        }

    }


    public validatePassword = async (req: Request, res: Response, next: any) => {
        const user = this.requestService.getUser();
        const valid = await bcrypt.compare(req.body.password, user.password);
	    if (!valid) return this.sendErrorResponse(res, new Error("Wrong password"), this.errorResponseMessage.INVALID_LOGIN, 400);
        next();
    }

    public ensureUniqueEmail = (req:Request, res:Response, next:any) => {
        const email = req.body.email;
        if (!email) {
            const error = new Error("Email is required");
            return this.sendErrorResponse(res, error, this.errorResponseMessage.EMAIL_REQUIRED, 400);
        }

        this.userService.findOne({email: email})
            .then((user) => {
                if (user) {
                    const error = new Error("Email already exists");
                    return this.sendErrorResponse(res, error, this.errorResponseMessage.DUPLICATE_EMAIL, 400);
                }
                next();
            })
            .catch((err) => {
                this.sendErrorResponse(res, err, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);
            })
    }

    public ensureUniquePhone = (req:Request, res:Response, next:any) => {
        const phone = req.body.phone;
        if (!phone) {
            const error = new Error("Phone number is required");
            return this.sendErrorResponse(res, error, this.errorResponseMessage.PHONE_REQUIRED, 400);
        }

        this.userService.findOne({phone: phone})
            .then((user) => {
                if (user) {
                    const error = new Error("Phone number already exists");
                    return this.sendErrorResponse(res, error, this.errorResponseMessage.DUPLICATE_PHONE, 400);
                }
                next();
            })
            .catch((err) => {
                this.sendErrorResponse(res, err, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);
            })
    }
}

export default UserMiddleware;
