import { Comment } from './comment'
import { Author } from './author'
import {Tag} from './tag'

export interface Topic {
  //topic: {
    _id: number,
    title: string,
    author: Author,
    content: string,
    tags: Tag[],
    comments: [Comment],
    likes: number,
    date: Date
  //}
}


