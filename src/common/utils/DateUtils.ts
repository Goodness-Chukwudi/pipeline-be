
import moment from 'moment';

class DateUtils {

    public getFullYear(date: any) {
        const theDate = new Date(date);
        return theDate.getFullYear();
    }

    public getMonth(date: any) {
        const theDate = new Date(date);
        return theDate.getMonth()+1;
    }

    public getMonthName(date: any) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const theDate = new Date(date);
        const month = theDate.getMonth();
        return monthNames[month];
    }

    public getDate(date: any) {
        const theDate = new Date(date);
        return theDate.getDate();
    }

    public getHours(date: any) {
        const theDate = new Date(date);
        return theDate.getHours();
    }

    public getMinutes(date: any) {
        const theDate = new Date(date);
        return theDate.getMinutes()+1;
    }

    public getSeconds(date: any) {
        const theDate = new Date(date);
        return theDate.getSeconds()+1;
    }

    public getDay(date: any) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const theDate = new Date(date);
        return days[theDate.getDay()];
    }

    public getDayByNumber(position: number) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[position];
    }

    public getWeek(date: any) {
        const theDate = new Date(date);
        return moment(theDate).format('w');
    }

    public addDays(date: any, days: number) {
        const theDate = new Date(date);
        return moment(theDate).add(days, 'day');
    }

    public addMonths(date: any, months: number) {
        const theDate = new Date(date);
        return moment(theDate).add(months, 'month');
    }

    public getMomentFromDate(date: any, format: string) {
        return moment(date, format);
    }

    public register(data: any) {
        const currentDate = Date.now();
        data.day_created = this.getDate(currentDate);
        data.week_created = this.getWeek(currentDate);
        data.month_created = this.getMonth(currentDate);
        data.year_created = this.getFullYear(currentDate);
        data.week_day_created = this.getDay(currentDate);
        data.hour_created = this.getHours(currentDate);
        data.am_or_pm = moment().format('A');

        return data;
    }
}

export default DateUtils;