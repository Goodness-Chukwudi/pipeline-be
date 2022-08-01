import Developer, {IDeveloper} from '../models/developer';
import DBService from './DBService';

class DeveloperService extends DBService<IDeveloper> {

    constructor(populatedFields:string[] = []) {
        super(Developer, populatedFields);
    }
    
}

export default DeveloperService;
