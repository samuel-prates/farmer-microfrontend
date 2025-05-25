import styled, { css } from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
`;

const buttonStyles = css`
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
`;

export const BlueButton = styled.button`
    ${buttonStyles}
    background: #1976d2;

    &:hover {
        background: #1565c0;
    }
`;

export const RedButton = styled.button`
    ${buttonStyles}
    background: #d32f2f;

    &:hover {
        background: #b71c1c;
    }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #fff;
  padding: 32px 24px;
  border-radius: 8px;
  min-width: 320px;
  max-width: 90vw;
`;

export const TdMiddle = styled.td`
  border-bottom: 1px solid #eee;
  padding: 8px;
  text-align: left;
`;

export const TdEnd = styled(TdMiddle)`
  text-align: middle;
`;

export const ThMiddle = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  text-align: left;
`;

export const ThEnd = styled(ThMiddle)`
  width: fit-content;
`;

export const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #fafafa;
`;