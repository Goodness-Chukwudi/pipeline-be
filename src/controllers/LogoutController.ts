import BaseController from "./base controllers/BaseController";
import { IUser } from "../models/user/User";
import { Response } from "express";
import LoginSessionService from "../services/LoginSessionService";
import { BIT } from "../common/constants/AppConstants";



class LogoutController extends BaseController {

    private loginSessionService: LoginSessionService;

    constructor() {
        super();
    }

    initRoutes() {
        this.logout();
    }

    protected initServices() {
        this.loginSessionService = new LoginSessionService();
    }

    protected initMiddleware() {
        // super.initMiddleware();
    }

    logout() {
        this.router.post("", (req, res) => {
            const user = this.requestService.getUser();
            this.logoutUser(user, res);
        });
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
export default new LogoutController().router;
