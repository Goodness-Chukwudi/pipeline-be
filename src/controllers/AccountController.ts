import BaseController from "./base controllers/BaseController";
import { IUser } from "../models/user/user";
import { Response } from "express";
import LoginSessionService from "../services/LoginSessionService";
import { BIT, USER_STATUS } from "../common/constants/AppConstants";

class AccountController extends BaseController {

    private loginSessionService: LoginSessionService;

    constructor() {
        super();
    }

    initRoutes() {
        this.signUp();
        this.login();
    }

    protected initServices() {
        this.loginSessionService = new LoginSessionService();
    }

    protected initMiddleware() {
        // super.initMiddleware();
    }

    login() {
        this.router.post("/login",
        this.userMiddleWare.loadUserToRequestByEmail,
        this.userMiddleWare.checkUserStatus,
        this.userMiddleWare.validatePassword
        );
        this.router.post("/login", async (req, res, next) => {
            //logout user from other devices who's session hasn't expired yet
            const user = this.requestService.getUser();
            try {
                const activeLoginSession = await this.loginSessionService.findOne({status: BIT.ON, user: user._id})
    
                if(activeLoginSession) {
                    if (activeLoginSession.validity_end_date > new Date()) {
                        activeLoginSession.logged_out = true;
                        activeLoginSession.validity_end_date = new Date();
                    } else {
                        activeLoginSession.expired = true
                    }
                    activeLoginSession.status = BIT.OFF;
                    await activeLoginSession.save();
                }
                next();
    
            } catch (error: any) {
                return this.sendErrorResponse(res, error, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);
    
            }
        });
        this.router.post("/login", (req, res) => {
            const user = this.requestService.getUser();
            this.loginUser(user, res);
        });
    }


    signUp() {
        this.router.post('/signup',
        [
            this.userMiddleWare.ensureUniqueEmail,
            this.userMiddleWare.ensureUniquePhone,
            this.userMiddleWare.hashNewPassword
        ]);
        
        this.router.post("/signup", async (req, res) => {
            const body = req.body;
            const userData = {
                first_name: body.first_name,
                last_name: body.last_name,
                middle_name: body.middle_name,
                phone: body.phone.trim(),
                email: body.email.trim().toLowerCase(),
                password: body.password,
                status: USER_STATUS.ACTIVE
            };

            try {
                const user = await this.userService.save(userData);
                this.loginUser(user, res);

            } catch (error: any) {
                this.sendErrorResponse(res, error, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);
            }
        });
    }

    private async loginUser(user: IUser, res: Response ) {
        const authCode = this.accountUtils.generateUUIDV4();
        const loginSessionData = {
            uuid: authCode,
            user: user._id,
            status: BIT.ON
        };

        this.loginSessionService.save(loginSessionData)
            .then(async (loginSession) => {
                const token = this.accountUtils.createLoginToken(loginSession);
                const response = {
                    message: this.successResponseMessage.LOGIN_SUCCESSFUL,
                    user: this.userService.getSafeUserData(user),
                    token: token
                }

                if (user.status == USER_STATUS.PENDING || user.status == USER_STATUS.SELF_DEACTIVATED) {
                    response.message = this.successResponseMessage.ACCOUNT_ACTIVATION_REQUIRED;
                }
                return res.status(200).json(response);
            })
            .catch(async (err: Error) => {
                this.sendErrorResponse(res, err, this.errorResponseMessage.UNABLE_TO_LOGIN, 500);
            })
    }

    private async logoutUser(user: IUser, res: Response ) {

        try {
            const activeLoginSession = await this.loginSessionService.findOne({status: BIT.ON, user: user._id})

            if (activeLoginSession.validity_end_date > new Date()) {
                activeLoginSession.logged_out = true;
                activeLoginSession.validity_end_date = new Date();
            } else {
                activeLoginSession.expired = true
            }
            activeLoginSession.status = BIT.OFF;
            await activeLoginSession.save();
            this.sendSuccessResponse(res, {}, 200);

        } catch (error: any) {
            this.sendErrorResponse(res, error, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);

        }
    }
}
export default new AccountController().router;
