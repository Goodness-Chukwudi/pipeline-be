import { Schema, model} from "mongoose";
import { BIT } from "../../common/constants/AppConstants";
const mongoosePaginate = require('mongoose-paginate-v2');

const LoginSessionSchema = new Schema<ILoginSession>({
    uuid: { type: String, index: true, trim: true, required: true},
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    status: {type: Number, enum: Object.values(BIT), default: BIT.OFF},
    validity_end_date: {type: Date, default: new Date(Date.now()+86400000)},
    logged_out: {type: Boolean, default: false},
    expired: {type: Boolean, default: false},
    os: { type: String},
    version: { type: String},
    device: { type: String},
}, 
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export interface ILoginSession {
    uuid: string,
    user: Schema.Types.ObjectId,
    status: number,
    validity_end_date: Date,
    logged_out: boolean,
    expired: boolean,
    os: string,
    version: string,
    device: string,
    
    _id: string
}

LoginSessionSchema.plugin(mongoosePaginate);
export default model<ILoginSession>("LoginSession", LoginSessionSchema);
