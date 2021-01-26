import { Comment } from './comment'
import { Author } from './author'

export interface Topic {
  //topic: {
    _id: number,
    title: string,
    author: Author,
    content: string,
    tags: [{ language: string, color: string }],
    comments: [Comment],
    likes: number,
    date: Date
  //}
}


