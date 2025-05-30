import React, { useState } from 'react';
import { BlueButton, Modal, Overlay, RedButton } from '../../styles/theme';
import { EditFarmerModalProps } from '../../types/edit-farmer';
import { Farm } from '../../types/farm';
import { Harvest } from '../../types/harvest';

export const EditFarmerModal: React.FC<EditFarmerModalProps> = ({ farmer, onSave, onClose }) => {
  const [farmerName, setFarmerName] = useState(String(farmer.farmerName));
  const [federalIdentification, setFederalIdentification] = useState(farmer.federalIdentification);
  const [farms, setFarms] = useState<Farm[]>(farmer.farms && farmer.farms.map(farm => ({
    ...farm,
    harvests: farm.harvests || [],
  })) || []);

  // Funções para editar fazendas
  const handleFarmChange = (index: number, field: keyof Farm, value: any) => {
    const updatedFarms = [...farms];
    updatedFarms[index] = { ...updatedFarms[index], [field]: value };
    setFarms(updatedFarms);
  };

  const handleAddFarm = () => {
    setFarms([...farms, { farmName: '', city: '', state: '', totalArea: 0, arableArea: 0, vegetationArea: 0, harvests: [] }]);
  };

  const handleRemoveFarm = (index: number) => {
    setFarms(farms.filter((_, i) => i !== index));
  };

  // Funções para editar safras
  const handleHarvestChange = (farmIndex: number, harvestIndex: number, field: keyof Harvest, value: any) => {
    const updatedFarms = [...farms];
    const updatedHarvests = [...(updatedFarms[farmIndex].harvests || [])];
    updatedHarvests[harvestIndex] = { ...updatedHarvests[harvestIndex], [field]: value };
    updatedFarms[farmIndex].harvests = updatedHarvests;
    setFarms(updatedFarms);
  };

  const handleAddHarvest = (farmIndex: number) => {
    const updatedFarms = [...farms];
    updatedFarms[farmIndex].harvests = [...(updatedFarms[farmIndex].harvests || []), { year: new Date().getFullYear(), culture: '' }];
    setFarms(updatedFarms);
  };

  const handleRemoveHarvest = (farmIndex: number, harvestIndex: number) => {
    const updatedFarms = [...farms];
    updatedFarms[farmIndex].harvests = updatedFarms[farmIndex].harvests.filter((_, i) => i !== harvestIndex);
    setFarms(updatedFarms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...farmer, farmerName, federalIdentification, farms });
  };

  return (
    <Overlay>
      <Modal>
        <h2>Editar Fazendeiro</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor='farmerName'>Nome:</label>
            <input
              type="text"
              id="farmerName"
              name='farmerName'
              value={farmerName}
              onChange={e => setFarmerName(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor='federalIdentification'>Documento:</label>
            <input
              id='federalIdentification'
              name='federalIdentification'
              type="text"
              value={federalIdentification}
              onChange={e => setFederalIdentification(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </div>
          <div>
            <h3>Fazendas</h3>
            {farms.map((farm, farmIdx) => (
              <div key={farmIdx} style={{ border: '1px solid #eee', borderRadius: 6, padding: 12, marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Nome da fazenda"
                  value={farm.farmName}
                  onChange={e => handleFarmChange(farmIdx, 'farmName', e.target.value)}
                  style={{ marginRight: 8, marginBottom: 4 }}
                  required
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={farm.city}
                  onChange={e=> handleFarmChange(farmIdx, 'city', e.target.value)}
                  style={{ marginRight: 8, marginBottom: 4 }}
                  required
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={farm.state}
                  onChange={e=> handleFarmChange(farmIdx, 'state', e.target.value)}
                  style={{ marginRight: 8, marginBottom: 4 }}
                  required
                />
                <input
                  type="number"
                  placeholder="Área total"
                  value={farm.totalArea}
                  onChange={e => handleFarmChange(farmIdx, 'totalArea', Number(e.target.value))}
                  style={{ width: 90, marginRight: 8 }}
                  required
                />
                <input
                  type="number"
                  placeholder="Área agricultável"
                  value={farm.arableArea}
                  onChange={e => handleFarmChange(farmIdx, 'arableArea', Number(e.target.value))}
                  style={{ width: 90, marginRight: 8 }}
                  required
                />
                <input
                  type="number"
                  placeholder="Área de vegetação"
                  value={farm.vegetationArea}
                  onChange={e => handleFarmChange(farmIdx, 'vegetationArea', Number(e.target.value))}
                  style={{ width: 90, marginRight: 8 }}
                  required
                />
                <RedButton type="button" onClick={() => handleRemoveFarm(farmIdx)}>Remover Fazenda</RedButton>
                <div style={{ marginTop: 8 }}>
                  <strong>Safras:</strong>
                  {farm.harvests && farm.harvests.map((harvest, harvestIdx) => (
                    <div key={harvestIdx} style={{ marginLeft: 16, marginBottom: 4 }}>
                      <input
                        type="number"
                        placeholder="Ano"
                        value={harvest.year}
                        onChange={e => handleHarvestChange(farmIdx, harvestIdx, 'year', Number(e.target.value))}
                        style={{ width: 80, marginRight: 8 }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Cultura"
                        value={harvest.culture}
                        onChange={e => handleHarvestChange(farmIdx, harvestIdx, 'culture', e.target.value)}
                        style={{ width: 120, marginRight: 8 }}
                        required
                      />
                      <RedButton type="button" onClick={() => handleRemoveHarvest(farmIdx, harvestIdx)}>Remover Safra</RedButton>
                    </div>
                  ))}
                  <BlueButton type="button" onClick={() => handleAddHarvest(farmIdx)} style={{ marginTop: 4 }}>Adicionar Safra</BlueButton>
                </div>
              </div>
            ))}
            <BlueButton type="button" onClick={handleAddFarm}>Adicionar Fazenda</BlueButton>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <BlueButton type="button" onClick={onClose}>Cancelar</BlueButton>
            <BlueButton type="submit">Salvar</BlueButton>
          </div>
        </form>
      </Modal>
    </Overlay>
  );
};