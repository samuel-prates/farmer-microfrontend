import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FarmerList } from './FarmerList';

const mockStore = configureStore([]);

describe('FarmerList', () => {
  it('renders loading state', () => {
    const store = mockStore({
      farmers: { farmers: [], status: 'loading', error: null },
    });
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const store = mockStore({
      farmers: { farmers: [], status: 'failed', error: 'Error message' },
    });
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );
    expect(screen.getByText(/Error: Error message/i)).toBeInTheDocument();
  });

  it('renders list of farmers', () => {
    const store = mockStore({
      farmers: {
        farmers: [
          { farmerName: 'Farmer 1', farms:[{farmName: 'Farm 1'}] },
          { farmerName: 'Farmer 2', farms:[{farmName: 'Farm 2'}] },
        ],
        status: 'succeeded',
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );
    expect(screen.getByText('Farm 1')).toBeInTheDocument();
    expect(screen.getByText('Farm 2')).toBeInTheDocument();
  });
});