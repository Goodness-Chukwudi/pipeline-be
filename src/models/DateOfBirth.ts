import { Schema, model} from "mongoose";
const mongoosePaginate = require('mongoose-paginate-v2');

const DateOfBirthSchema = new Schema<IDateOfBirth>({
    day: {type: Number, required: true},
    week: {type: Number, required: true},
    month: {type: Number, required: true},
    month_name: {type: String, required: true},
    year: {type: Number, required: true},
    week_day: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export interface IDateOfBirth {
    day: number,
    week: number,
    month: number,
    month_name: string,
    year: number,
    week_day: string,
    user: Schema.Types.ObjectId,
    
    _id: string
}

DateOfBirthSchema.plugin(mongoosePaginate);
export default model<IDateOfBirth>("DateOfBirth", DateOfBirthSchema);
