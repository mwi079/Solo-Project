import React from 'react';
import ReactDOM from 'react-dom';

import Comments from '../Components/Comments/Comments';

//Comments Component
test('COMMENTS: Renders correct default text when no comments supplied', () => {
  const container = document.createElement('div');
  const topic = {comments: []}
  ReactDOM.render(<Comments topic= {topic}/>, container);
  expect(container.textContent).toMatch('No comments yet.. 😕');
})

