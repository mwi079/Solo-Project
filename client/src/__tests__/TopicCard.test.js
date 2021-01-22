import React from 'react';
import ReactDOM from 'react-dom';

import { getByTestId } from '@testing-library/dom';

import { StateContext } from '../global.context/globalStore.reducer';

import TopicCard from '../Components/TopicCard/TopicCard';

//Context provider is expecting a value of state.isAuth and a function for dispatch
const dispatch = () => {};
const state = {isAuth: true }

//Topic Card Component
describe('Topics Component', () => {

  it('Renders a topic on the supplied info', () => {

    const container = document.createElement('div');
    //Create dummy data
    const topic = {
      title: 'Test Title',
      author: {
        name: 'Bill', surname: 'Gates'
      },
      tags: ['Test1', 'Test2', 'Test3'],
      comments: ['Wow so interest']
    };
    
    //Render component to container div
    ReactDOM.render(
    <StateContext.Provider value={{state, dispatch}}>
      <TopicCard topic= {topic}/>
    </StateContext.Provider>, container);
  
    //Perform required tests
    const heading = getByTestId(container, "topic-title");
    expect(heading.textContent).toEqual(topic.title);   
    const authorName = getByTestId(container, "topic-author");
    expect(authorName.textContent).toEqual(topic.author.name);
    
  }),

  it('Renders correct default text when no questions supplied', () => {
    const container = document.createElement('div');
    const topic = null;
    ReactDOM.render(
    <StateContext.Provider value={{state, dispatch}}>
      <TopicCard topic= {topic}/>
    </StateContext.Provider>, container);
    expect(container.textContent).toMatch('Sorry, there are no quesitons yet. Hurry, and be the first one to begin the conversation! 🗣️');
  })

})
