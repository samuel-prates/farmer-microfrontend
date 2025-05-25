import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FarmersPage } from './FarmersPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock the async action creator to return a plain object
jest.mock('../features/farmer/farmersSlice', () => ({
  fetchFarmer: () => ({ type: 'farmers/fetchAll' }),
}));

// Mock FarmerList e Layout para simplificar o teste
jest.mock('../components/organisms/FarmerList', () => ({
  FarmerList: () => <div data-testid="farmer-list" />,
}));
jest.mock('../components/templates/Layout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="layout">{children}</div>,
}));

const mockStore = configureMockStore({middleware:[thunk]});

describe('FarmersPage', () => {
  it('renders Layout, title and FarmerList, and dispatches fetchFarmer', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <FarmersPage />
      </Provider>
    );
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByText('Fazendeiros Registrados')).toBeInTheDocument();
    expect(screen.getByTestId('farmer-list')).toBeInTheDocument();
    // Verifica se a action foi despachada
    const actions = store.getActions();
    expect(actions.some(a => a.type && a.type.includes('farmers/fetchAll'))).toBe(true);
  });
});