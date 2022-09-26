import Talent, {ITalent} from '../models/talent';
import DBService from './DBService';

class TalentService extends DBService<ITalent> {

    constructor(populatedFields:string[] = []) {
        super(Talent, populatedFields);
    }
    
}

export default TalentService;
