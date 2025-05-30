import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditFarmerModal } from './EditFarmerModal';

const mockFarmer = {
  id: 1,
  farmerName: 'João',
  federalIdentification: '12345678900',
  farms: [
    {
      farmName: 'Fazenda 1',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 20,
      harvests: [
        { year: 2023, culture: 'Soja' },
      ],
    },
  ],
};

describe('EditFarmerModal', () => {
  it('renders farmer data and farms', () => {
    render(<EditFarmerModal farmer={mockFarmer} onSave={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByDisplayValue('João')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345678900')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Fazenda 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('80')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Soja')).toBeInTheDocument();
  });

  it('calls onClose when Cancelar is clicked', () => {
    const onClose = jest.fn();
    render(<EditFarmerModal farmer={mockFarmer} onSave={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onSave with updated data when Salvar is clicked', () => {
    const onSave = jest.fn();
    render(<EditFarmerModal farmer={mockFarmer} onSave={onSave} onClose={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Maria' } });
    fireEvent.submit(screen.getByText(/Salvar/i).closest('form')!);
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ farmerName: 'Maria' }));
  });

  it('adds a new farm', () => {
    render(<EditFarmerModal farmer={mockFarmer} onSave={jest.fn()} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText(/Adicionar Fazenda/i));
    expect(screen.getAllByPlaceholderText(/Nome da fazenda/i).length).toBe(2);
  });

  it('adds a new harvest', () => {
    render(<EditFarmerModal farmer={mockFarmer} onSave={jest.fn()} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText(/Adicionar Safra/i));
    expect(screen.getAllByPlaceholderText(/Ano/i).length).toBe(2);
  });
});
