import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { FarmerCard } from '../molecules/FarmerCard';

export const FarmerList = () => {
  const { farmers, status, error } = useSelector((state: RootState) => state.farmers);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      {farmers.map((farmer: any) => (
        <FarmerCard key={farmer.farmName} farmer={farmer} />
      ))}
    </div>
  );
};