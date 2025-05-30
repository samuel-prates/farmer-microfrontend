import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { BlueButton, RedButton, TdEnd, TdMiddle, ThEnd, ThMiddle } from '../../styles/theme';
import { Farmer } from '../../types/farmer';
import { EditFarmerModal } from '../templates/EditFarmerModal';
import { createFarmer, deleteFarmer, updateFarmer } from '../../features/farmer/farmerActions';
import { fetchFarmer, setPage } from '../../features/farmer/farmersSlice';
import { CreateFarmerModal } from '../templates/CreateFarmerModal';

export const FarmerList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { farmers, status, error, pagination } = useSelector((state: RootState) => state.farmers);
  const dispatch: AppDispatch = useDispatch();

  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (farmer: Farmer) => {
    setEditingFarmer(farmer);
  };

  const handleSave = async (updatedFarmer: Farmer) => {
    await dispatch(updateFarmer(updatedFarmer));
    setEditingFarmer(null);
    dispatch(fetchFarmer({ page: pagination.page, limit: pagination.limit }));
  };

  const handleCreateSave = async (updatedFarmer: Farmer) => {
    await dispatch(createFarmer(updatedFarmer));
    setShowCreateModal(false);
    // After creating a new farmer, go to the first page to see it
    dispatch(setPage(1));
    dispatch(fetchFarmer({ page: 1, limit: pagination.limit }));
  };

  const handleClose = () => {
    setEditingFarmer(null);
    setShowCreateModal(false);
    dispatch(fetchFarmer({ page: pagination.page, limit: pagination.limit }));
  }

  const handleDelete = async (farmer: Farmer) => {
    const confirmDelete = window.confirm(`Deseja realmente deletar o fazendeiro "${farmer.farmerName}"?`);
    if (!confirmDelete) return;
    await dispatch(deleteFarmer(farmer.id));

    // If we're on the last page and there's only one item, go to the previous page
    if (pagination.page > 1 && farmers.length === 1) {
      dispatch(setPage(pagination.page - 1));
      dispatch(fetchFarmer({ page: pagination.page - 1, limit: pagination.limit }));
    } else {
      dispatch(fetchFarmer({ page: pagination.page, limit: pagination.limit }));
    }
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

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 10 }}>
        <BlueButton 
          onClick={() => handlePageChange(pagination.page - 1)} 
          disabled={pagination.page <= 1}
        >
          Anterior
        </BlueButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                padding: '5px 10px',
                border: pagination.page === page ? '2px solid #1565c0' : '1px solid #ccc',
                borderRadius: '4px',
                background: pagination.page === page ? '#e3f2fd' : 'white',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
        </div>

        <BlueButton 
          onClick={() => handlePageChange(parseInt(pagination.page) + 1)}
          disabled={pagination.page >= pagination.totalPages}
        >
          Próxima
        </BlueButton>
      </div>

      <div style={{ textAlign: 'center', marginTop: 10, color: '#666' }}>
        Mostrando {farmers.length} de {pagination.total} fazendeiros | Página {pagination.page} de {pagination.totalPages}
      </div>

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
