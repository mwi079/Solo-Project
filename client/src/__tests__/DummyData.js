const dummyTopic = {
  _id: 1,
  title: 'Test Title',
  author: {
    name: 'Bill'
  },
  tags: ['Test1', 'Test2', 'Test3'],
  comments: ['Wow so interest']
};

const dummyComment = {comments: [
  { author: {
    name: 'Dave'
  },
  comment: 'A test comment'
  }
]};


module.exports = { dummyTopic, dummyComment };