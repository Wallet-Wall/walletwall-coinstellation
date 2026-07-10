import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Coinstellation from '../src/Coinstellation.jsx';
import fixture from '../src/data/coinstellation.fixture.json';

// The verified current Coinstellation node taxonomy (matches canonical's
// wallet/token/defi/nft/counterparty set). `anomaly` is intentionally absent —
// it is a ring indicator on a node, never a `type` value. Pinned here so the
// taxonomy can't silently drift back to the old wallet/exchange/protocol/
// token/defi/institution set.
const VALID_NODE_TYPES = ['wallet', 'token', 'defi', 'nft', 'counterparty'];
const RETIRED_NODE_TYPES = ['exchange', 'protocol', 'institution', 'anomaly'];

describe('Coinstellation node taxonomy', () => {
  it('every fixture node uses a type from the verified taxonomy', () => {
    for (const node of fixture.nodes) {
      expect(VALID_NODE_TYPES).toContain(node.type);
    }
  });

  it('never uses a retired or invented node type', () => {
    const usedTypes = new Set(fixture.nodes.map((n) => n.type));
    for (const retired of RETIRED_NODE_TYPES) {
      expect(usedTypes.has(retired)).toBe(false);
    }
  });

  it('fixture includes at least one node of each valid type', () => {
    const usedTypes = new Set(fixture.nodes.map((n) => n.type));
    for (const type of VALID_NODE_TYPES) {
      expect(usedTypes.has(type)).toBe(true);
    }
  });

  it('exactly one wallet node (the subject/anchor), others are counterparties', () => {
    const walletNodes = fixture.nodes.filter((n) => n.type === 'wallet');
    expect(walletNodes.length).toBe(1);
  });

  it('anomalies are expressed as a per-node array, never as a node type', () => {
    const anomalyFlaggedNodes = fixture.nodes.filter(
      (n) => Array.isArray(n.anomalies) && n.anomalies.length > 0,
    );
    expect(anomalyFlaggedNodes.length).toBeGreaterThan(0);
    for (const node of anomalyFlaggedNodes) {
      expect(node.type).not.toBe('anomaly');
      expect(VALID_NODE_TYPES).toContain(node.type);
    }
  });

  it('renders the legend with the verified node types and a separate anomaly ring entry', () => {
    render(<Coinstellation />);
    for (const type of VALID_NODE_TYPES) {
      expect(screen.getByText(type)).toBeInTheDocument();
    }
    expect(screen.getByText('anomaly ring')).toBeInTheDocument();
    for (const retired of ['exchange', 'protocol', 'institution']) {
      expect(screen.queryByText(retired)).not.toBeInTheDocument();
    }
  });

  it('shows a fixture-flagged node with neutral, evidence-based wording (not accusatory)', () => {
    render(<Coinstellation />);
    const flaggedNode = fixture.nodes.find(
      (n) => Array.isArray(n.anomalies) && n.anomalies.length > 0,
    );
    fireEvent.click(
      screen.getByRole('button', { name: (n) => n.includes(flaggedNode.label) }),
    );
    const panel = screen.getByTestId('node-flags');
    expect(panel.textContent).toMatch(/flagged in this demo fixture/i);
    expect(panel.textContent.toLowerCase()).not.toMatch(/malicious|confirmed bad actor|scam/);
  });
});

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
