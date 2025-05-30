import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FarmerList } from './FarmerList';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock das dependências
jest.mock('../templates/EditFarmerModal', () => ({
  EditFarmerModal: ({ farmer, onSave, onClose }: any) => (
    <div data-testid="edit-modal">
      <button onClick={() => onSave(farmer)}>Salvar</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  ),
}));
jest.mock('../templates/CreateFarmerModal', () => ({
  CreateFarmerModal: ({ onSave, onClose }: any) => (
    <div data-testid="create-modal">
      <button onClick={() => onSave({ farmerName: 'Novo', federalIdentification: '999', farms: [] })}>Salvar</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  ),
}));

const mockStore = configureMockStore({ middleware: [thunk] });

const initialState = {
  farmers: {
    farmers: [
      {
        farmerName: 'João',
        federalIdentification: '123',
        farms: [{ farmName: 'Fazenda 1' }, { farmName: 'Fazenda 2' }],
      },
    ],
    status: 'succeeded',
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1
    }
  },
};

describe('FarmerList', () => {
  it('renders table with farmers', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Fazenda 1, Fazenda 2')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Deletar')).toBeInTheDocument();
  });

  it('opens and closes EditFarmerModal', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );
    fireEvent.click(screen.getByText('Editar'));
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  it('opens and closes CreateFarmerModal', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );
    fireEvent.click(screen.getByText('Novo Fazendeiro'));
    expect(screen.getByTestId('create-modal')).toBeInTheDocument();
  });

  it('renders pagination controls', () => {
    const store = mockStore({
      farmers: {
        ...initialState.farmers,
        pagination: {
          page: 2,
          limit: 10,
          total: 25,
          totalPages: 3
        }
      }
    });
    render(
      <Provider store={store}>
        <FarmerList />
      </Provider>
    );

    // Check if pagination controls are rendered
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Check if current page is highlighted
    const page2Button = screen.getByText('2');
    expect(page2Button).toHaveStyle('border: 2px solid #1565c0');

    // Check if pagination info is displayed
    expect(screen.getByText('Mostrando 1 de 25 fazendeiros | Página 2 de 3')).toBeInTheDocument();
  });
});
