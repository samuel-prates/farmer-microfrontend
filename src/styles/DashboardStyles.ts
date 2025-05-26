import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatCard = styled(Card)`
  grid-column: span 1;
`;

export const ChartCard = styled(Card)`
  grid-column: span 1;
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1565c0;
  margin: 10px 0;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChartPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #666;
`;