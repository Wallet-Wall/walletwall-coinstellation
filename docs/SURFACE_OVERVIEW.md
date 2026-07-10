# Coinstellation — Surface Overview

Coinstellation is a read-only wallet and entity relationship graph. It is one of the public conceptual-demo surfaces published by the WalletWall org — alongside [Stable Seer](https://github.com/Wallet-Wall/walletwall-stable-seer), [Holder Wall](https://github.com/Wallet-Wall/walletwall-holder-wall), and [Whale Watcher](https://github.com/Wallet-Wall/walletwall-whale-watcher). This document describes Coinstellation only; it does not describe the full current WalletWall product suite.

This repository is a public-safe conceptual demonstration, not the complete production application. It runs entirely on static fixtures and does not include WalletWall's live provider pipeline, proprietary scoring internals, or production data.

---

## What Coinstellation Shows

- **SVG-based node/edge graph** of wallet and entity relationships
- **Node types:** wallet, token, defi, nft, counterparty — plus an anomaly ring, a separate indicator (not a node type) drawn on any node flagged by this demo's fixture data
- **Per-node detail:** label, type, demo address, any fixture-flagged anomaly note, and connected edges with direction and edge label
- **Color-coded legend** by node type, with a separate ring swatch for the anomaly indicator
- **Stats panel:** total node and edge count

## What Coinstellation Does Not Do

- No live graph data or chain indexing
- No real wallet addresses — all addresses are clearly marked `(demo)`
- No wallet connection, signing, or transaction tracing against a live chain
- No identity attribution or sensitive labeling
- No claim that a node's type or flagged status establishes ownership, identity, or wrongdoing

## Design Intent

Shows how wallet/counterparty relationships are visualized for a vault-readiness context decision. In the full product this connects to a graph provider — that dependency is not present here.

---

## How These Surfaces Relate

Coinstellation, Stable Seer, Holder Wall, and Whale Watcher are read-only lenses on the same underlying subject: the safety and exposure profile of stablecoins and the wallets that hold them.

- **Stable Seer** examines the stablecoin itself: peg health, liquidity, and pool structure.
- **Coinstellation** (this repo) examines a wallet: who it transacts with, what it holds, and how value flows.
- **Holder Wall** examines the holder distribution of a stablecoin: concentration, entity type, and holding behavior.
- **Whale Watcher** examines large-wallet and treasury-like activity and movement signals.

Together they form a read-only analytics picture. Write flows, vault decisions, signing, and execution are intentionally out of scope for all of these public repositories.
