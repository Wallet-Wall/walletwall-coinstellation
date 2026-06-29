import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Coinstellation from '../src/Coinstellation.jsx';
import fixture from '../src/data/coinstellation.fixture.json';

describe('Coinstellation', () => {
  it('renders the surface', () => {
    render(<Coinstellation />);
    expect(screen.getByTestId('coinstellation')).toBeInTheDocument();
  });

  it('renders all fixture nodes as interactive elements', () => {
    render(<Coinstellation />);
    for (const node of fixture.nodes) {
      const label = node.label;
      expect(
        screen.getByRole('button', { name: (n) => n.includes(label) }),
      ).toBeInTheDocument();
    }
  });

  it('renders the SVG graph', () => {
    render(<Coinstellation />);
    expect(screen.getByRole('img', { name: /wallet relationship graph/i })).toBeInTheDocument();
  });

  it('shows node and edge stat cards before selection', () => {
    render(<Coinstellation />);
    expect(screen.getByText('Nodes')).toBeInTheDocument();
    expect(screen.getByText('Edges')).toBeInTheDocument();
  });

  it('shows node detail on click', () => {
    render(<Coinstellation />);
    const { label } = fixture.nodes[0];
    fireEvent.click(screen.getByRole('button', { name: (n) => n.includes(label) }));
    expect(screen.getByTestId('node-detail')).toBeInTheDocument();
  });

  it('shows disclaimer', () => {
    render(<Coinstellation />);
    expect(screen.getByTestId('disclaimer')).toBeInTheDocument();
  });
});
