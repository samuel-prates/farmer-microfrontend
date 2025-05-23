import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #fafafa;
`;

type HavestsDetailsProps = {
  harvest: {
    year: number;
    culture: string;
  }
};

type FarmDetailsProps = {
  farm: {
    farmName: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
    harvests: Array<{
      year: number;
      culture: string;
    }>;
  };
};

type Farmer = {
  federalIdentification: string;
  farmerName: number;
  farms: Array<{
    farmName: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
    harvests: Array<{
      year: number;
      culture: string;
    }>;
  }>;
};

const HavestsDetails: React.FC<HavestsDetailsProps> = ({ harvest }) => (
  <li style={{ marginLeft: 16, marginBottom: 8 }}>
    <span style={{ fontWeight: 'bold' }}>{harvest.year}</span> - {harvest.culture}
  </li>
);

const FarmDetails: React.FC<FarmDetailsProps> = ({ farm }) => (
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