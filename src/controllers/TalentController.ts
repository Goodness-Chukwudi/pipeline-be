import TalentService from "../services/TalentService";
import BaseController from "./base controllers/BaseController";



class TalentController extends BaseController {

    private developerService: TalentService;

    constructor() {
        super();
    }

    initRoutes() {
        this.listDevelopers();
        this.view();
    }

    protected initServices() {
        this.developerService = new TalentService();
    }

    protected initMiddleware() {
        
    }

    listDevelopers() {
        this.router.get("/", (req, res) => {
            const page: any = req.query.page;
            const company: any = req.query.company;
            const location: any = req.query.location;
            const name: any = req.query.name;
            const stack: any = req.query.stack;
            const email: any = req.query.email;
            const hireable: boolean = req.query.hireable === "on";

            let query = {};
            if (hireable) query = Object.assign(query, {hireable: hireable});
            if (company) query = Object.assign(query, {company: new RegExp(company, "i")});
            if (stack) query = Object.assign(query, {stack: new RegExp(stack, "i")});
            if (email) query = Object.assign(query, {email: new RegExp(email, "i")});
            if (location) query = Object.assign(query, {$or: [
                {location: new RegExp(location, "i")},
                {country: new RegExp(location, "i")},
                {city: new RegExp(location, "i")},
                {geo_location: new RegExp(location, "i")},
                {address: new RegExp(location, "i")}
            ]});
            if (name) query = Object.assign(query, {$or: [
                {name: new RegExp(name, "i")},
                {full_name: new RegExp(name, "i")}
            ]});

            this.developerService.paginate(query, 50, page)
            .then(developers => {
                this.sendSuccessResponse(res, developers)
            })
            .catch(error => {
                this.sendErrorResponse(res, error, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);
            })
        });
    }
    
    view() {
        this.router.get("/:id", (req, res) => {
            const id = req.params.id

            this.developerService.findById(id)
            .then(developer => {
                this.sendSuccessResponse(res, developer)
            })
            .catch(error => {
                this.sendErrorResponse(res, error, this.errorResponseMessage.UNABLE_TO_COMPLETE_REQUEST, 500);
            })
        });
    }
}
export default new TalentController().router;
