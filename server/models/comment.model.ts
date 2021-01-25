import {model,Schema,Model,Document} from 'mongoose'

interface Icomment extends Document {
  comment:string;
  count:number;
  author:string;
}

const commentSchema = new Schema({
  comment: { type: String },
  count: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Comment:Model<Icomment> = model("Comment", commentSchema);


