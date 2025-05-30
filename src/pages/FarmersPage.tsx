import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarmer } from '../features/farmer/farmersSlice';
import { FarmerList } from '../components/organisms/FarmerList';
import Layout from '../components/templates/Layout';
import { RootState, AppDispatch } from '../app/store';

export const FarmersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pagination } = useSelector((state: RootState) => state.farmers);

  useEffect(() => {
    dispatch(fetchFarmer({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  return (
    <>
      <Layout>
          <h1>Fazendeiros Registrados</h1>
          <FarmerList />
      </Layout>
    </>
  );
};
