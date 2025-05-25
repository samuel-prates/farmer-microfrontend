import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  Container,
  BlueButton,
  RedButton,
  Overlay,
  Modal,
  TdMiddle,
  TdEnd,
  ThMiddle,
  ThEnd,
  Card,
} from './theme';

describe('Styled Components in theme.ts', () => {
  it('renders Container', () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveStyle('max-width: 1280px');
  });

  it('renders BlueButton and RedButton', () => {
    const { getByText } = render(
      <>
        <BlueButton>Azul</BlueButton>
        <RedButton>Vermelho</RedButton>
      </>
    );
    expect(getByText('Azul')).toHaveStyle('background: #1976d2');
    expect(getByText('Vermelho')).toHaveStyle('background: #d32f2f');
  });

  it('renders Overlay and Modal', () => {
    const { getByTestId } = render(
      <Overlay data-testid="overlay">
        <Modal data-testid="modal">Modal</Modal>
      </Overlay>
    );
    expect(getByTestId('overlay')).toBeInTheDocument();
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('renders table cells and headers', () => {
    const { getByText } = render(
      <table>
        <thead>
          <tr>
            <ThMiddle>MeioA</ThMiddle>
            <ThEnd>FimA</ThEnd>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TdMiddle>MeioB</TdMiddle>
            <TdEnd>FimB</TdEnd>
          </tr>
        </tbody>
      </table>
    );
    expect(getByText('MeioA')).toBeInTheDocument();
    expect(getByText('FimA')).toBeInTheDocument();
    expect(getByText('MeioB')).toBeInTheDocument();
    expect(getByText('FimB')).toBeInTheDocument();
  });

  it('renders Card', () => {
    const { getByText } = render(<Card>Card Content</Card>);
    expect(getByText('Card Content')).toBeInTheDocument();
  });
});