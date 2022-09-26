import { API_PATH } from "../App";
import TalentController from "../controllers/TalentController";
import UserController from "../controllers/UserController";
class AppRoutes {

    private app;
    constructor(app:any) {
        this.app = app;
    }

    initRoutes() {
        this.app.use(API_PATH + "/talents", TalentController);
        this.app.use(API_PATH + "/users", UserController);
    }
}

export default AppRoutes;