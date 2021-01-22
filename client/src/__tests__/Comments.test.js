import React from 'react';
import ReactDOM from 'react-dom';

import Comments from '../Components/Comments/Comments';

//Alternative syntax for individual tests
// test('Renders correct default text when no comments supplied', () => {
//     const container = document.createElement('div');
//     const topic = {comments: []}
//     ReactDOM.render(<Comments topic= {topic}/>, container);
//     expect(container.textContent).toMatch('No comments yet.. 😕');
//   }
// );

describe("Comments Component", ()=> {
  it('Renders correct default text when no comments supplied', () => {
    const container = document.createElement('div');
    const topic = {comments: []}
    ReactDOM.render(<Comments topic= {topic}/>, container);
    expect(container.textContent).toMatch('No comments yet.. 😕');
  }),

  it('Renders a comment correctly', () => {
    const container = document.createElement('div');
    const topic = {comments: ['Comment 1', 'Comment 2','Comment 3']}
    ReactDOM.render(<Comments topic= {topic}/>, container);
    console.log(container);
  })
});


