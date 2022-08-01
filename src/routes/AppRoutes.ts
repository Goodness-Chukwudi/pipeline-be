import { API_PATH } from "../App";
import DeveloperController from "../controllers/DeveloperController";
import HrController from "../controllers/HrController";
class AppRoutes {

    private app;
    constructor(app:any) {
        this.app = app;
    }

    initRoutes() {
        this.app.use(API_PATH + "/developers", DeveloperController);
        this.app.use(API_PATH + "/hr-managers", HrController);
    }
}

export default AppRoutes;