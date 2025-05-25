import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { BlueButton, RedButton, TdEnd, TdMiddle, ThEnd, ThMiddle } from '../../styles/theme';
import { Farmer } from '../../types/farmer';
import { EditFarmerModal } from '../templates/EditFarmerModal';
import { createFarmer, deleteFarmer, updateFarmer } from '../../features/farmer/farmerActions';
import { fetchFarmer } from '../../features/farmer/farmersSlice';
import { CreateFarmerModal } from '../templates/CreateFarmerModal';

export const FarmerList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { farmers, status, error } = useSelector((state: RootState) => state.farmers);
  const dispatch: AppDispatch = useDispatch();

  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);

  const handleEdit = (farmer: Farmer) => {
    setEditingFarmer(farmer);
  };

  const handleSave = async (updatedFarmer: Farmer) => {
    await dispatch(updateFarmer(updatedFarmer));
    setEditingFarmer(null);
    dispatch(fetchFarmer());
  };

  const handleCreateSave = async (updatedFarmer: Farmer) => {
    await dispatch(createFarmer(updatedFarmer));
    setEditingFarmer(null);
    dispatch(fetchFarmer());
  };

  const handleClose = () => {
    setEditingFarmer(null);
    dispatch(fetchFarmer());
  }

  const handleDelete = async (farmer: Farmer) => {
    const confirmDelete = window.confirm(`Deseja realmente deletar o fazendeiro "${farmer.farmerName}"?`);
    if (!confirmDelete) return;
    await dispatch(deleteFarmer(farmer.id, fetchFarmer));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <BlueButton onClick={() => setShowCreateModal(true)}>Novo Fazendeiro</BlueButton>
      </div>
      {showCreateModal && (
        <CreateFarmerModal
          onSave={handleCreateSave}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      {<table style={{ width: '100%', background: '#fff', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <ThMiddle>Nome</ThMiddle>
            <ThMiddle>Documento</ThMiddle>
            <ThMiddle>Fazendas</ThMiddle>
            <ThEnd>Ações</ThEnd>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(farmers) && farmers.map((farmer: Farmer) => (
            <tr key={farmer.farmerName}>
              <TdMiddle>{farmer.farmerName}</TdMiddle>
              <TdMiddle>{farmer.federalIdentification}</TdMiddle>
              <TdMiddle>
                {Array.isArray(farmer.farms)
                  ? farmer.farms.map((farm: any) => farm.farmName).join(', ')
                  : ''}
              </TdMiddle>
              <TdEnd>
                <BlueButton onClick={() => handleEdit(farmer)} style={{ marginRight: 8 }}>Editar</BlueButton>
                <RedButton onClick={() => handleDelete(farmer)}>Deletar</RedButton>
              </TdEnd>
            </tr>
          ))}
        </tbody>
      </table>}
      {editingFarmer && (
        <EditFarmerModal
          farmer={editingFarmer}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </>
  );
};