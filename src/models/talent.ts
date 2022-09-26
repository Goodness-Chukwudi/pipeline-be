import { Point } from "geojson";
import { Schema, model} from "mongoose";
import DateUtils from "../common/utils/DateUtils";
const mongoosePaginate = require('mongoose-paginate-v2');

const PointSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

  const ExperienceSchema = new Schema({
    position: {type: String, required: true},
    organisation: {type: String, required: true},
    from: {type: Date, required: true},
    to: {type: Date},
    achievements: [String]
  });

  const EducationSchema = new Schema({
    degree: {type: String, required: true},
    institution: {type: String, required: true},
    from: {type: Date, required: true},
    to: {type: Date}
  });

  const CertificationSchema = new Schema({
    certificate: {type: String, required: true},
    institution: {type: String, required: true},
    date_issued: {type: Date, required: true},
    expiry_date: {type: Date}
  });

const TalentSchema = new Schema<ITalent>({

    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    avatar_url: {type: String, default: ""},
    bio: {type: String, default: ""},
    blog_url: {type: String, default: ""},
    verified: {type: Boolean, default: false},
    name: {type: String, default: ""},
    url: {type: String, default: ""},
    country: {type: String, default: ""},
    stack: {type: String, default: ""},
    city: {type: String, default: ""},
    address: {type: String, default: ""},
    geo_location: {type: PointSchema},
    github_url: {type: String, default: ""},
    linkedin_url: {type: String, default: ""},
    twitter_url: {type: String, default: ""},
    experiences: {type: [ExperienceSchema], default: []},
    education: {type: [EducationSchema], default: []},
    languages: {type: [String], default: []},
    certifications: {type: [CertificationSchema], default: []},

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
    });

export interface ITalent {
    user: any,
    avatar_url: string,
    bio: string,
    blog_url: string,
    verified: boolean,
    name: string,
    url: string,
    github_url: string,
    linkedin_url: string,
    twitter_url: string,
    stack: string,
    address: string,
    city: string,
    country: string,
    geo_location: Point,
    experiences: any,
    education: any,
    languages: string[],
    certifications: any,
    // articles: any[], Create a schema for this guy
    day_created: number,
    week_created: number,
    month_created: number,
    year_created: number,
    week_day_created: string,
    hour_created: number,
    am_or_pm: string,

    _id: Schema.Types.ObjectId
}

TalentSchema.pre('save', function() {
  return new Promise((resolve, reject) => {
      const dateUtils = new DateUtils();
      if (this.isNew) {
          dateUtils.register(this);
      }
      resolve();
  });
})

TalentSchema.plugin(mongoosePaginate);
export default model<ITalent>("Talent", TalentSchema);
