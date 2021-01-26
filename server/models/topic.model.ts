
import {model,Schema,Model,Document} from 'mongoose'

export interface Itopic extends Document {
  title:string;
  content:string;
  comments:any[];
  likes:number;
  tags:object;
  date:string;
  author:string;
}

const topicSchema = new Schema({
  title: {
    type: String,
    min: 10,
    required: true,
  },
  content: {
    type: String,
    min: 50,
    max: 1050,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  tags: {
    type: {
      language: { type: String },
      color: { type: String },
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Topic:Model<Itopic> = model("Topic", topicSchema);


