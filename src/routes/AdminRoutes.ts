import { API_PATH } from "../App";
import { USER_ROLES } from "../common/constants/AppConstants";
import UserPrivilegeMiddleware from "../middlewares/user/UserPrivilegeMiddleware";


class AdminRoutes {

    private app;
    constructor(app:any) {
        this.app = app;
    }

    initRoutes() {
        const userPrivilegeMiddleware = new UserPrivilegeMiddleware(this.app, USER_ROLES.ADMIN);
        this.app.use(API_PATH + "/admin", userPrivilegeMiddleware.validatePrivilege);

        

    }
}

export default AdminRoutes;