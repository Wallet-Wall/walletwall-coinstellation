import { useState } from 'react';
import fixture from './data/coinstellation.fixture.json';
import Disclaimer from './components/Disclaimer.jsx';
import './Coinstellation.css';

// Coinstellation's node taxonomy: wallet (the address being explored), token
// (ERC-20 contract), defi (DeFi protocol contract), nft (NFT contract), and
// counterparty (another address that transacted with the wallet but isn't
// otherwise classified). These labels are descriptive only — a node's
// category does not establish ownership, identity, or institutional
// affiliation.
const NODE_COLORS = new Map([
  ['wallet',       '#BF4E32'],
  ['token',        '#B88A4A'],
  ['defi',         '#D4705A'],
  ['nft',          '#2F8F67'],
  ['counterparty', '#C9A47A'],
]);

// Anomaly is not a node type — it is a ring indicator drawn on top of any
// node (of any type) whose fixture data carries an `anomalies` entry. It
// flags a pattern observed in this demo's fixture, not an accusation of
// wrongdoing.
const ANOMALY_RING_COLOR = '#E4483C';

function getNodeColor(type) {
  return NODE_COLORS.get(type) ?? '#C9A47A';
}

function nodeAnomalies(node) {
  return Array.isArray(node?.anomalies) ? node.anomalies : [];
}

const NODE_R = 22;
const SVG_W = 780;
const SVG_H = 560;

function nodeById(id) {
  return fixture.nodes.find((n) => n.id === id);
}

export default function Coinstellation() {
  const [selected, setSelected] = useState(null);

  const selectedNode = selected ? fixture.nodes.find((n) => n.id === selected) : null;
  const connectedEdges = selected
    ? fixture.edges.filter((e) => e.source === selected || e.target === selected)
    : [];

  return (
    <div className="cs-root" data-testid="coinstellation">
      <div className="cs-header">
        <div>
          <div className="ww-label" style={{ marginBottom: 4 }}>Coinstellation</div>
          <h1 className="cs-heading">Wallet Relationship Graph</h1>
          <p className="cs-subheading">
            Read-only entity graph — demo fixture data only. Click a node to inspect connections.
          </p>
        </div>
      </div>

      <Disclaimer />

      <div className="cs-body">
        <div className="cs-graph-wrap">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="cs-svg"
            aria-label="Wallet relationship graph"
            role="img"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="rgba(30,26,20,0.22)" />
              </marker>
            </defs>

            {fixture.edges.map((edge) => {
              const src = nodeById(edge.source);
              const tgt = nodeById(edge.target);
              if (!src || !tgt) return null;
              const isActive =
                selected &&
                (edge.source === selected || edge.target === selected);
              return (
                <line
                  key={edge.id}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={isActive ? '#BF4E32' : 'rgba(30,26,20,0.14)'}
                  strokeWidth={isActive ? 2 : 1}
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {fixture.nodes.map((node) => {
              const color = getNodeColor(node.type);
              const isSelected = node.id === selected;
              const isConnected =
                selected &&
                connectedEdges.some(
                  (e) => e.source === node.id || e.target === node.id,
                );
              const muted = selected && !isSelected && !isConnected;
              const flagged = nodeAnomalies(node).length > 0;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x},${node.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(isSelected ? null : node.id)}
                  role="button"
                  aria-label={`${node.label} (${node.type})${flagged ? ' — flagged in this demo fixture' : ''}`}
                  aria-pressed={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelected(isSelected ? null : node.id);
                    }
                  }}
                >
                  {flagged && (
                    <circle
                      className="cs-anomaly-ring"
                      r={NODE_R + (isSelected ? 3 : 0) + 4}
                      fill="none"
                      stroke={ANOMALY_RING_COLOR}
                      strokeWidth={1.5}
                      opacity={muted ? 0.25 : 0.85}
                    />
                  )}
                  <circle
                    r={NODE_R + (isSelected ? 3 : 0)}
                    fill={color}
                    fillOpacity={muted ? 0.18 : isSelected ? 1 : 0.82}
                    stroke={isSelected ? '#8B3120' : 'rgba(255,255,255,0.6)'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize={8}
                    fontWeight={700}
                    fill={muted ? 'rgba(30,26,20,0.3)' : '#fff'}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.label.length > 10
                      ? node.label.slice(0, 9) + '…'
                      : node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="cs-legend">
            {[...NODE_COLORS.entries()].map(([type, color]) => (
              <div key={type} className="cs-legend-item">
                <span
                  className="cs-legend-dot"
                  style={{ background: color }}
                  aria-hidden="true"
                />
                <span className="cs-legend-label">{type}</span>
              </div>
            ))}
            {/* Anomaly is a ring drawn on top of any node type, not a node type
                of its own — shown here as an open ring rather than a filled dot. */}
            <div className="cs-legend-item">
              <span className="cs-legend-ring" aria-hidden="true" />
              <span className="cs-legend-label">anomaly ring</span>
            </div>
          </div>
        </div>

        <div className="cs-panel">
          {selectedNode ? (
            <div data-testid="node-detail">
              <div className="ww-label" style={{ marginBottom: 10 }}>Node Detail</div>
              <div className="cs-node-title">{selectedNode.label}</div>

              <div className="cs-detail-row">
                <span className="cs-detail-key">Type</span>
                <span
                  className="ww-badge"
                  style={{
                    background: getNodeColor(selectedNode.type) + '22',
                    color: getNodeColor(selectedNode.type),
                    border: `1px solid ${getNodeColor(selectedNode.type)}44`,
                  }}
                >
                  {selectedNode.type}
                </span>
              </div>
              <div className="cs-detail-row">
                <span className="cs-detail-key">Address (demo)</span>
                <code className="cs-address">{selectedNode.address_demo}</code>
              </div>

              {nodeAnomalies(selectedNode).length > 0 && (
                <div className="cs-flags" data-testid="node-flags">
                  <div className="cs-detail-key" style={{ marginBottom: 6 }}>
                    Flagged in this demo fixture
                  </div>
                  {nodeAnomalies(selectedNode).map((reason) => (
                    <div key={reason} className="cs-flag-row">
                      {reason}
                    </div>
                  ))}
                </div>
              )}

              <div className="ww-label" style={{ margin: '18px 0 8px' }}>
                Connections ({connectedEdges.length})
              </div>
              {connectedEdges.map((edge) => {
                const otherId =
                  edge.source === selected ? edge.target : edge.source;
                const other = nodeById(otherId);
                const direction = edge.source === selected ? 'out' : 'in';
                return (
                  <div key={edge.id} className="cs-edge-row">
                    <span
                      className="cs-edge-dir"
                      style={{ color: direction === 'out' ? '#BF4E32' : '#5B7EA6' }}
                    >
                      {direction === 'out' ? '→' : '←'}
                    </span>
                    <span className="cs-edge-label">{other?.label}</span>
                    <span className="cs-edge-type">{edge.label}</span>
                  </div>
                );
              })}

              <button
                className="cs-clear-btn"
                onClick={() => setSelected(null)}
              >
                Clear selection
              </button>
            </div>
          ) : (
            <div className="cs-panel-empty">
              <div className="ww-label" style={{ marginBottom: 8 }}>Select a node</div>
              <p>Click any node in the graph to inspect its type, demo address, and connections.</p>
              <div className="cs-stats">
                <div className="cs-stat">
                  <div className="cs-stat__value">{fixture.nodes.length}</div>
                  <div className="cs-stat__label">Nodes</div>
                </div>
                <div className="cs-stat">
                  <div className="cs-stat__value">{fixture.edges.length}</div>
                  <div className="cs-stat__label">Edges</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
