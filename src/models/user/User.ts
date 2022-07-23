import { Schema, model} from "mongoose";
import { GENDER, USER_STATUS } from "../../common/constants/AppConstants";
import DateUtils from "../../common/utils/DateUtils";
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema<IUser>({
        first_name: { type: String,  required: [true, "first name is require"]},
        last_name: { type: String,  required: [true, "last name is require"]},
        middle_name: { type: String},
        email: { type: String, lowercase: true, index: true, unique: true, trim: true, required: [true, "email is require"]},
        password: {type: String, required: [true, "password is require"]},
        phone: { type: String, unique: true, index: true, required: [true, "phone is require"], trim: true},
        phone_country_code: { type: String,  default: "234"},
        country: {type: String},
        gender: {type: String, lowercase: true, enum: Object.values(GENDER)},
        profile_pic_url: {type: String, default: ''},
        profile_pic_thumbnail_url: {type: String, default: ''},
        status: { type: String, default: USER_STATUS.PENDING, enum: Object.values(USER_STATUS) },
        last_active_at: {type: Date, default: new Date()},
        require_new_password: {type: Boolean, default: false},

        day_created: {type: Number},
        week_created: {type: Number},
        month_created: {type: Number},
        year_created: {type: Number},
        week_day_created: {type: String},
        hour_created: {type: Number},
        am_or_pm: {type: String}

    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })
;

UserSchema.virtual('full_name').get(function() {
    if (this.middle_name)
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
    return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual('phone_with_country_code').get(function() {
    const phoneWithoutZero = parseInt(this.phone);
    const phone = '+' + this.phone_country_code + phoneWithoutZero.toString();
    return phone;
});

UserSchema.methods.hideProtected = function() {
    this.password = undefined;
}


export interface IUser {
    first_name: string,
    last_name: string,
    middle_name: string,
    email: string,
    password: string,
    phone: string,
    phone_country_code: string,
    country: string,
    gender: string,
    dob: Date,
    date_of_birth: Date,
    profile_pic_url: string,
    profile_pic_thumbnail_url: string,
    status: string,
    last_active_at: Date,
    require_new_password: boolean,
    address: string,
    id_document: string,
    welcome_email_sent: boolean,
    activation_email_sent: boolean,
    address_verified: boolean,
    document_satisfied: boolean,
    day_created: number,
    week_created: number,
    month_created: number,
    year_created: number,
    week_day_created: string,
    hour_created: number,
    am_or_pm: string,
    
    _id: string
}

export const EDITABLE_FIELDS = [
    'first_name',
    'last_name',
    'middle_name',
    'gender'
]

UserSchema.pre('save', function() {
    return new Promise((resolve, reject) => {
        const dateUtils = new DateUtils();
        if (this.isNew) {
            dateUtils.register(this);
        }
        resolve();
    });
})

UserSchema.plugin(mongoosePaginate);
export default model<IUser>("User", UserSchema);
