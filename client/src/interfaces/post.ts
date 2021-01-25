export type Post = {
  _id: number,
  author: string,
  comments: [string],
  title: string,
  content: string,
  tags: [string],
  likes: number,
  date: Date
}