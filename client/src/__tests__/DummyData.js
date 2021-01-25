const dummyTopic = {
  _id: 154123132165461321,
  title: 'Test Title',
  author: {
    name: 'Bill'
  },
  tags: [{language: 'JavaScript', color: 'FFD700'}],
  comments: ['Wow so interest'],
  likes: 2,
  date: "2021-01-21T14:20:46.129Z"
};

const dummyComment = {comments: [
  { author: {
    name: 'Dave'
  },
  comment: 'A test comment'
  }
]};

const testData = {
  email : 'testEmail',
  password : 'testPassword',
  name : 'testName',
  surname : 'testSurname',
  title : 'testTitle',
  content : 'testContent',
}



module.exports = { dummyTopic, dummyComment, testData };