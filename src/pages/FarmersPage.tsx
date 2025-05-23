import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFarmer } from '../features/farmer/farmersSlice';
import { FarmerList } from '../components/organisms/FarmerList';

export const FarmersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFarmer() as any);
  }, [dispatch]);

  return (
    <main>
      <h1>Fazendeiros Registrados</h1>
      <FarmerList />
    </main>
  );
};