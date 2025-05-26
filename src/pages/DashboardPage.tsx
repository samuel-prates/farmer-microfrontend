// @ts-ignore
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchFarmStates, fetchHarvestCultures, fetchAreas } from '../features/dashboard/dashboardSlice';
import Layout from '../components/templates/Layout';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  DashboardContainer,
  Card,
  StatCard,
  ChartCard,
  StatValue,
  StatLabel,
  ChartContainer,
  ChartPlaceholder
} from '../styles/DashboardStyles';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const { farmStates, harvestCultures, areas, totalFarms, status } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchFarmStates() as any);
    dispatch(fetchHarvestCultures() as any);
    dispatch(fetchAreas() as any);
  }, [dispatch]);

  const totalArea = areas.totalArableArea + areas.totalVegetationArea;

  // Loading state for charts
  const renderLoading = () => (
    <ChartPlaceholder>
      Loading...
    </ChartPlaceholder>
  );

  return (
    <Layout>
      <h1>Dashboard</h1>

      <DashboardContainer>
        {/* Total Farms Card */}
        <StatCard>
          <StatLabel>Total de Fazendas Cadastradas</StatLabel>
          <StatValue>{status === 'loading' ? '...' : totalFarms}</StatValue>
        </StatCard>

        {/* Total Area Card */}
        <StatCard>
          <StatLabel>Total de Hectares Registrados</StatLabel>
          <StatValue>{status === 'loading' ? '...' : `${totalArea.toFixed(2)} ha`}</StatValue>
        </StatCard>

        {/* State Distribution Chart */}
        <ChartCard>
          <h3>Distribuição por Estado</h3>
          <ChartContainer>
            {status === 'loading' ? renderLoading() : (
              <Pie
                data={{
                  labels: Object.keys(farmStates),
                  datasets: [{
                    data: Object.values(farmStates),
                    backgroundColor: [
                      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                  }]
                }}
              />
            )}
          </ChartContainer>
        </ChartCard>

        {/* Culture Distribution Chart */}
        <ChartCard>
          <h3>Distribuição por Cultura Plantada</h3>
          <ChartContainer>
            {status === 'loading' ? renderLoading() : (
              <Pie
                data={{
                  labels: Object.keys(harvestCultures),
                  datasets: [{
                    data: Object.values(harvestCultures),
                    backgroundColor: [
                      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                  }]
                }}
              />
            )}
          </ChartContainer>
        </ChartCard>

        {/* Land Use Chart */}
        <ChartCard>
          <h3>Uso do Solo</h3>
          <ChartContainer>
            {status === 'loading' ? renderLoading() : (
              <Pie
                data={{
                  labels: ['Área Agricultável', 'Vegetação'],
                  datasets: [{
                    data: [areas.totalArableArea, areas.totalVegetationArea],
                    backgroundColor: ['#36A2EB', '#4BC0C0']
                  }]
                }}
              />
            )}
          </ChartContainer>
        </ChartCard>
      </DashboardContainer>
    </Layout>
  );
};

export default DashboardPage;
