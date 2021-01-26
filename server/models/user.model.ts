
import {model,Schema,Model,Document} from 'mongoose'

export interface Iuser extends Document {
  name:string;
  surname:string;
  email:string;
  password:string;
  html_url:string;
  gists_url:string;
  location:string;
  avatar_url:string;
  posts:[string];
  comments:[string];
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  surname: {
    type: String,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    min: 6,
    max: 1024,
  },
  html_url: { type: String },
  gists_url: { type: String },
  location: { type: String },
  avatar_url: { type: String },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export const User:Model<Iuser> =model('User',userSchema)




