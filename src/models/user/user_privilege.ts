import { Schema, model} from "mongoose";
import { ITEM_STATUS, USER_ROLES } from "../../common/constants/AppConstants";
const mongoosePaginate = require('mongoose-paginate-v2');

const UserPrivilegeSchema = new Schema<IUserPrivilege>({
    user: { type: Schema.Types.ObjectId, ref: "User"},
    role: { type: Number, required: true, enum: Object.values(USER_ROLES) },
    created_by: { type: Schema.Types.ObjectId, ref: "User"},
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: ITEM_STATUS.ACTIVE, enum: Object.values(ITEM_STATUS) }
}, 
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export interface IUserPrivilege {
    user: any,
    role: number,
    status: string,
    created_by: any,
    updated_by: any,
    
    _id: Schema.Types.ObjectId
}

UserPrivilegeSchema.plugin(mongoosePaginate);
export default model<IUserPrivilege>("UserPrivilege", UserPrivilegeSchema);
