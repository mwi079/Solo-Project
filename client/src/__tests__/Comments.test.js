import React from 'react';
import ReactDOM from 'react-dom';

import { getByTestId } from '@testing-library/dom';

import Comments from '../Components/Comments/Comments';

import { dummyComment } from './DummyData'; 

//Alternative syntax for individual tests
// test('Renders correct default text when no comments supplied', () => {
//     const container = document.createElement('div');
//     const topic = {comments: []}
//     ReactDOM.render(<Comments topic= {topic}/>, container);
//     expect(container.textContent).toMatch('No comments yet.. 😕');
//   }
// );

describe("Comments Component", ()=> {

  it('Renders a topic comment correctly', () => {
    const container = document.createElement('div');
    const topic = dummyComment;
    ReactDOM.render(<Comments topic= {topic}/>, container);
    const author = getByTestId(container, 'comment-author');
    expect(author.textContent).toEqual('Dave');
    const comment = getByTestId(container, 'comment-comment');
    console.log('Test', comment.textContent);
    expect(comment.textContent).toEqual('A test comment');
  }),

  it('Renders correct default text when no comments supplied', () => {
    const container = document.createElement('div');
    const topic = {comments: []}
    ReactDOM.render(<Comments topic= {topic}/>, container);
    expect(container.textContent).toMatch('No comments yet.. 😕');
  })

});
 


