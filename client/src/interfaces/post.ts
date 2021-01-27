import {Tag} from './tag'

export type Post = {
  _id?: number,
  author?: string,
  comments?: string[],
  title: string,
  content: string,
  tags: Tag[],
  likes?: number,
  date?: Date
}