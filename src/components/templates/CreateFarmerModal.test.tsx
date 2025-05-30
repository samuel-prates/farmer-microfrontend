import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateFarmerModal } from './CreateFarmerModal';

describe('CreateFarmerModal', () => {
  it('renders form fields', () => {
    render(<CreateFarmerModal onSave={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Documento:/i)).toBeInTheDocument();
    expect(screen.getByText(/Fazendas/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Fazenda/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
  });

  it('calls onClose when Cancelar is clicked', () => {
    const onClose = jest.fn();
    render(<CreateFarmerModal onSave={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onSave with correct data when Salvar is clicked', () => {
    const onSave = jest.fn();
    render(<CreateFarmerModal onSave={onSave} onClose={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Novo Fazendeiro' } });
    fireEvent.change(screen.getByLabelText(/Documento:/i), { target: { value: '12345678900' } });
    fireEvent.click(screen.getByText(/Adicionar Fazenda/i));
    fireEvent.change(screen.getAllByPlaceholderText(/Nome da fazenda/i)[0], { target: { value: 'Fazenda Teste' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Cidade/i)[0], { target: { value: 'Cidade Teste' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Estado/i)[0], { target: { value: 'Estado Teste' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Área total/i)[0], { target: { value: '100' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Área agricultável/i)[0], { target: { value: '80' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Área de vegetação/i)[0], { target: { value: '20' } });
    fireEvent.submit(screen.getByText(/Salvar/i).closest('form')!);
    expect(onSave).toHaveBeenCalledWith({
      farmerName: 'Novo Fazendeiro',
      federalIdentification: '12345678900',
      farms: [
        {
          farmName: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'Estado Teste',
          totalArea: 100,
          arableArea: 80,
          vegetationArea: 20,
          harvests: [],
        },
      ],
    });
  });
});
