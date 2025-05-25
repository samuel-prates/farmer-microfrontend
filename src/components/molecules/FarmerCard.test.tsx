import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FarmerCard } from './FarmerCard';
import { Farmer } from '../../types/farmer';

const mockFarmer: Farmer = {
  farmerName: 'João Silva',
  federalIdentification: '12345678900',
  farms: [
    {
      farmName: 'Fazenda Boa Vista',
      totalArea: 100,
      arableArea: 70,
      vegetationArea: 30,
      harvests: [
        { year: 2023, culture: 'Soja' },
        { year: 2022, culture: 'Milho' },
      ],
    },
  ],
};

describe('FarmerCard', () => {
  it('renders farmer information', () => {
    render(<FarmerCard farmer={mockFarmer} />);
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Identificação: 12345678900')).toBeInTheDocument();
    expect(screen.getByText('Fazenda Boa Vista')).toBeInTheDocument();
    expect(screen.getByText('Área total: 100')).toBeInTheDocument();
    expect(screen.getByText('Área agricultável: 70')).toBeInTheDocument();
    expect(screen.getByText('Área de vegetação: 30')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('- Soja')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('- Milho')).toBeInTheDocument();
  });
});