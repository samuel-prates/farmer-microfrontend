import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FarmersPage } from './FarmersPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock the async action creator to return a plain object
jest.mock('../features/farmer/farmersSlice', () => ({
  fetchFarmer: (params) => ({ type: 'farmers/fetchAll', payload: params }),
  setPage: (page) => ({ type: 'farmers/setPage', payload: page }),
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
    const store = mockStore({
      farmers: {
        farmers: [],
        status: 'idle',
        error: null,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        }
      }
    });
    render(
      <Provider store={store}>
        <FarmersPage />
      </Provider>
    );
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByText('Fazendeiros Registrados')).toBeInTheDocument();
    expect(screen.getByTestId('farmer-list')).toBeInTheDocument();
    // Verifica se a action foi despachada com os parâmetros corretos
    const actions = store.getActions();
    const fetchAction = actions.find(a => a.type === 'farmers/fetchAll');
    expect(fetchAction).toBeTruthy();
    expect(fetchAction.payload).toEqual({ page: 1, limit: 10 });
  });
});
