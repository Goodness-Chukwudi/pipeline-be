import DBService from './DBService';
import UserPrivilege, {IUserPrivilege} from '../models/user/user_privilege';

class UserPrivilegeService extends DBService<IUserPrivilege> {

    constructor(populatedFields:string[] = []) {
        super(UserPrivilege, populatedFields);
    }
}

export default UserPrivilegeService;
