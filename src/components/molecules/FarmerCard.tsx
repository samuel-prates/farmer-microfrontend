import React from 'react';
import { Farmer } from '../../types/farmer';
import { Farm } from '../../types/farm';
import { Harvest } from '../../types/harvest';
import { Card } from '../../styles/theme';


const HavestsDetails: React.FC<{ harvest: Harvest }> = ({ harvest }) => (
  <li style={{ marginLeft: 16, marginBottom: 8 }}>
    <span style={{ fontWeight: 'bold' }}>{harvest.year}</span> - {harvest.culture}
  </li>
);

const FarmDetails: React.FC<{ farm: Farm }> = ({ farm }) => (
  <div style={{ marginLeft: 16, marginBottom: 8 }}>
    <strong>{farm.farmName}</strong>
    <div>Área total: {farm.totalArea}</div>
    <div>Área agricultável: {farm.arableArea}</div>
    <div>Área de vegetação: {farm.vegetationArea}</div>
    <div>Safras:</div>
    <ul>
      {farm.harvests?.map((harvest, idx) => (
        <HavestsDetails key={idx} harvest={harvest} />
      ))}
    </ul>
  </div>
);

export const FarmerCard = ({ farmer }: { farmer: Farmer }) => (
  <Card>
    <h3>{farmer.farmerName}</h3>
    <div>Identificação: {farmer.federalIdentification}</div>
    <div>Fazendas:</div>
    {farmer.farms?.map((farm) => (
      <FarmDetails key={farm.farmName} farm={farm} />
    ))}
  </Card>
);