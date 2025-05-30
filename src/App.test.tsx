import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock FarmersPage para simplificar o teste
jest.mock('./pages/FarmersPage', () => ({
  FarmersPage: () => <div data-testid="farmers-page">Farmers Page</div>,
}));

describe('App', () => {
  it('renders FarmersPage inside Provider', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('farmers-page')).toBeInTheDocument();
  });
});
