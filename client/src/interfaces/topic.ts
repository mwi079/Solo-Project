export interface Topic {
  topic: {
    _id: number,
    title: string,
    author: Author,
    tags: [{ language: string, color: string }],
    comments: [Comment],
    likes: number,
    date: Date
  }
}

interface Comment {
  author: Author,
  comment: string
}

interface Author {
  name: string,
  surname: string,
  avatar_url: string
}

