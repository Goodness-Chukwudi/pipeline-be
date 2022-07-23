import DBService from './DBService';
import DateOfBirth, {IDateOfBirth} from '../models/DateOfBirth';
import DateUtils from '../common/utils/DateUtils';

class DateOfBirthService extends DBService<IDateOfBirth> {

    private dateUtils: DateUtils;

    constructor(populatedFields:string[] = []) {
        super(DateOfBirth, populatedFields);
        this.dateUtils = new DateUtils();
    }

    createDOB(dob: any, user: string) {
        const date = new Date(dob);
        const dateOfBirth = {
            day: this.dateUtils.getDate(date),
            week: this.dateUtils.getWeek(date),
            month: this.dateUtils.getMonth(date),
            month_name: this.dateUtils.getMonthName(date),
            year: this.dateUtils.getFullYear(date),
            week_day: this.dateUtils.getDay(date),
            user: user
        }
        return dateOfBirth;
    }
}

export default DateOfBirthService;
