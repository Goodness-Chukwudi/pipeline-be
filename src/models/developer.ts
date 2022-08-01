import { Point } from "geojson";
import { Schema, model} from "mongoose";
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

const DeveloperSchema = new Schema<IDeveloper>({
    avatar_url: {type: String, default: ""},
    bio: {type: String, default: ""},
    blog: {type: String, default: ""},
    company: {type: String, default: ""},
    email: {type: String, default: ""},
    followers: {type: Number, default: 0},
    following: {type: Number, default: 0},
    hireable: {type: Boolean, default: false},
    id: {type: String, default: ""},
    location: {type: String, default: ""},
    name: {type: String, default: ""},
    public_repos: {type: Number, default: 0},
    followers_url: {type: String, default: ""},
    following_url: {type: String, default: ""},
    repos_url: {type: String, default: ""},
    url: {type: String, default: ""},
    login: {type: String, default: ""},
    type: {type: String, default: ""},
    organizations: {type: [String], default: []},
    following_list: {type: [String], default: []},
    follower_list: {type: [String], default: []},
    country: {type: String, default: ""},
    stack: {type: String, default: ""},
    city: {type: String, default: ""},
    geo_location: {type: String, default: ""},
    latitudes: {type: Number},
    longitudes: {type: Number},
    address: {type: String, default: ""},
    geometry: {type: PointSchema},
    crs: {type: String, default: ""},
    real_url: {type: String, default: ""},
    public_identifier: {type: String, default: ""},
    full_name: {type: String, default: ""},
    occupation: {type: String, default: ""},
    headline: {type: String, default: ""},
    experiences: {type: [], default: []},
    education: {type: [], default: []},
    languages: {type: [String], default: []},
    certifications: {type: [], default: []},
    connections: {type: Number, default: 0},
    similarly_named_profiles: {type: [], default: []},
    articles: {type: [], default: []},
    groups: {type: [], default: []},
    git_id: {type: String, default: ""}

    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });

export interface IDeveloper {
    avatar_url: string,
    bio: string,
    blog: string,
    company: string,
    email: string,
    followers: number,
    following: number,
    hireable: boolean,
    id: string,
    location: string,
    name: string,
    public_repos: number,
    followers_url: string,
    following_url: string,
    repos_url: string,
    url: string,
    login: string,
    type: string,
    organizations: string[],
    following_list: string[],
    follower_list: string[],
    country: string,
    stack: string,
    city: string,
    geo_location: string,
    latitudes: number,
    longitudes: number,
    address: string,
    geometry: Point,
    crs: string,
    real_url: string,
    public_identifier: string,
    full_name: string,
    occupation: string,
    headline: string,
    experiences: any[],
    education: any[],
    languages: string[],
    certifications: any[],
    connections: number,
    similarly_named_profiles: any[],
    articles: any[],
    groups: any[],
    git_id: string
}

DeveloperSchema.plugin(mongoosePaginate);
export default model<IDeveloper>("Developer", DeveloperSchema);
