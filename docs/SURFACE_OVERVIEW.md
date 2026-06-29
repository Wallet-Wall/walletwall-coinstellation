# Coinstellation — Surface Overview

Coinstellation is a read-only wallet and entity relationship graph. It is one of three surfaces in the WalletWall analytics suite. The other two are [Stable Seer](https://github.com/Wallet-Wall/walletwall-stable-seer) and [Holder Wall](https://github.com/Wallet-Wall/walletwall-holder-wall).

---

## What Coinstellation Shows

- **SVG-based node/edge graph** of wallet and entity relationships
- **Node types:** wallet, exchange, protocol, token, DeFi pool, institution
- **Per-node detail:** label, type, demo address, and connected edges with direction and edge label
- **Color-coded legend** by entity type
- **Stats panel:** total node and edge count

## What Coinstellation Does Not Do

- No live graph data or chain indexing
- No real wallet addresses — all addresses are clearly marked `(demo)`
- No wallet connection, signing, or transaction tracing against a live chain
- No identity attribution or sensitive labeling

## Design Intent

Shows how counterparty relationships are visualized for a vault-readiness context decision. In the full product this connects to a graph provider — that dependency is not present here.

---

## How the Three Surfaces Relate

All three WalletWall surfaces are read-only lenses on the same underlying subject: the safety and exposure profile of stablecoins and the wallets that hold them.

- **Stable Seer** examines the stablecoin itself: peg health, liquidity, and pool structure.
- **Coinstellation** (this repo) examines a wallet: who it transacts with, what it holds, and how value flows.
- **Holder Wall** examines the holder distribution of a stablecoin: concentration, entity type, and holding behavior.

Together they form a read-only analytics picture. Write flows, vault decisions, signing, and execution are intentionally out of scope for all three public repositories.
