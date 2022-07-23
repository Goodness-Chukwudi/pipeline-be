import { API_PATH } from "../App";


class AdminRoutes {

    private app;
    constructor(app:any) {
        this.app = app;
    }

    initRoutes() {
        // const sysUserMiddleware = new SysUserMiddleware(this.app);
        // this.app.use(API_PATH + "/admin", sysUserMiddleware.isAdmin);

    }
}

export default AdminRoutes;