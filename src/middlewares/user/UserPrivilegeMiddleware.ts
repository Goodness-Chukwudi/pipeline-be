import { Request, Response, Router } from "express";
import { ITEM_STATUS, USER_ROLES } from "../../common/constants/AppConstants";
import UserPrivilegeService from "../../services/UserPrivilegeService";
import BaseRouterMiddleware from "../BaseRouterMiddleware";

export class UserPrivilegeMiddleware extends BaseRouterMiddleware {
    private userPrivilegeService: UserPrivilegeService;

    userRole: number;
    constructor(appRouter: Router, role: number) {
        super(appRouter);
        this.userRole = role;
    }

    protected initServices() {
        this.userPrivilegeService = new UserPrivilegeService();
    }
    
    public validatePrivilege = (req: Request, res: Response, next: any) => {
        const user = this.requestService.getUser();
        const query = {user: user._id, role: USER_ROLES.ADMIN, status: ITEM_STATUS.ACTIVE}
        this.userPrivilegeService.findOne(query)
            .then((userPrivilege) => {
                if (userPrivilege && userPrivilege._id) {
                    next();
                } else {
                    const error = new Error("Invalid permission. Only "+ this.userRole + "s are allowed")
                   this.sendErrorResponse(res, error, this.errorResponseMessage.INVALID_PERMISSION, 403)
                }
                
            })
            .catch((err) => {
                this.sendErrorResponse(res, err, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500)
            })
    }
}

export default UserPrivilegeMiddleware;
