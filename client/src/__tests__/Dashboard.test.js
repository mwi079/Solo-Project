import React from 'react';
import axios from 'axios';

import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { StateContext } from '../global.context/globalStore.reducer';

import { dummyTopic } from './DummyData';

import Dashboard from '../Components/Dashboard/Dashboard';

//Configure Jest mock for API call

jest.mock('axios');

//Context provider is expecting a value of state.isAuth and a function for dispatch
const dispatch = () => {};
const state = {isAuth: true };

describe('Dashboard', () => {
  it('Correctly renders topic after API call', async () => {
    axios.get.mockResolvedValue({data:[dummyTopic]});
    render(
      <StateContext.Provider value={{state, dispatch}}>
        <Dashboard/>
      </StateContext.Provider>
    )
    const topicsCards = await waitFor(() => screen.getByTestId("topic-cards"));
    expect(topicsCards).toBeInTheDocument();
  });
})
