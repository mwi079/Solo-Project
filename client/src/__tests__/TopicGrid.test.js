import React from 'react';
import ReactDOM from 'react-dom';

import { StateContext } from '../global.context/globalStore.reducer';

import TopicsGrid from '../Components/TopicsGrid/TopicsGrid'

//Context provider is expecting a value of state.isAuth and a function for dispatch
const dispatch = () => {};
const state = {isAuth: true }

//Dummy fn
const dummyFn = () => {};


describe('Topics Grid', () => {
  it('Renders correct default text when no questions supplied', () => {
    const container = document.createElement('div');
    const topics = null;
    ReactDOM.render(<StateContext.Provider value={{state, dispatch}}>
      <TopicsGrid topics = {topics} setTopics = {dummyFn}/>
    </StateContext.Provider>, container);
     expect(container.textContent).toMatch('Sorry, there are no quesitons yet. Hurry, and be the first one to begin the conversation! 🗣️');
  })
})
