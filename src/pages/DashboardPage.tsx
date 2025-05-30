import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
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
  ChartPlaceholder,
  ErrorMessage,
  StatValueSkeleton,
  StatLabelSkeleton,
  ChartSkeleton
} from '../styles/DashboardStyles';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { farmStates, harvestCultures, areas, totalFarms, status } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchFarmStates());
    dispatch(fetchHarvestCultures());
    dispatch(fetchAreas());
  }, [dispatch]);

  const totalArea = areas.totalArableArea + areas.totalVegetationArea;

  // Loading state for charts
  const renderChartSkeleton = () => (
    <ChartPlaceholder>
      <ChartSkeleton />
    </ChartPlaceholder>
  );

  return (
    <Layout children={undefined}>
      <h1>Dashboard</h1>

      {status === 'failed' && (
        <ErrorMessage>
          Erro ao carregar dados do dashboard. Por favor, tente novamente mais tarde.
        </ErrorMessage>
      )}

      <DashboardContainer>
        {/* Total Farms Card */}
        <StatCard>
          <StatLabel>Total de Fazendas Cadastradas</StatLabel>
          {status === 'loading' ? (
            <StatValueSkeleton />
          ) : (
            <StatValue>{totalFarms}</StatValue>
          )}
        </StatCard>

        {/* Total Area Card */}
        <StatCard>
          <StatLabel>Total de Hectares Registrados</StatLabel>
          {status === 'loading' ? (
            <StatValueSkeleton />
          ) : (
            <StatValue>{`${totalArea.toFixed(2)} ha`}</StatValue>
          )}
        </StatCard>

        {/* State Distribution Chart */}
        <ChartCard>
          <h3>Distribuição por Estado</h3>
          <ChartContainer>
            {status === 'loading' ? renderChartSkeleton() : (
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
            {status === 'loading' ? renderChartSkeleton() : (
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
            {status === 'loading' ? renderChartSkeleton() : (
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
