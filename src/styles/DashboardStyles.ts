import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
`;

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const StatCard = styled(Card)`
  align-items: center;
  justify-content: center;
  min-height: 150px;
`;

export const ChartCard = styled(Card)`
  min-height: 300px;
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1565c0;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
`;

export const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChartPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-style: italic;
`;

export const SkeletonBase = styled.div`
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const StatValueSkeleton = styled(SkeletonBase)`
  width: 80%;
  height: 40px;
  margin: 10px 0;
`;

export const StatLabelSkeleton = styled(SkeletonBase)`
  width: 70%;
  height: 20px;
  margin-bottom: 10px;
`;

export const ChartSkeleton = styled(SkeletonBase)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 4px solid #c62828;
`;
