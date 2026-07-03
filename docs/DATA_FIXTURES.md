# Data Fixtures

Coinstellation ships with synthetic, clearly labeled demo data located in `src/data/coinstellation.fixture.json`. All demo addresses are clearly fake and must not be used for identity or attribution purposes.

## Fixture File

| File | Purpose |
|---|---|
| `coinstellation.fixture.json` | Graph nodes and edges with demo addresses, entity types, and edge labels |

## Fixture Schema

```jsonc
{
  "_note": "DEMO DATA ONLY — synthetic graph fixture. All addresses are clearly fake demo labels.",
  "as_of": "<ISO timestamp>",
  "subject": {
    "address_demo": "0xDEMO000...AAAA",
    "label": "Demo Wallet A",
    "type": "wallet"
  },
  "nodes": [
    {
      "id": "node-a",
      "label": "Demo Wallet A",
      "type": "wallet" | "exchange" | "protocol" | "token" | "defi" | "institution",
      "address_demo": "0xDEMO000...AAAA",
      "x": 400,
      "y": 300
    }
  ],
  "edges": [
    {
      "id": "e-ab",
      "source": "node-a",
      "target": "node-b",
      "label": "transfer (demo)",
      "value_demo": 14000
    }
  ]
}
```

### Node Types

| Type | Color |
|---|---|
| `wallet` | Terracotta (`#BF4E32`) |
| `exchange` | Steel blue (`#5B7EA6`) |
| `protocol` | Muted slate teal (`#6E8B8A`) |
| `token` | Warm amber (`#B88A4A`) |
| `defi` | Brick (`#D4705A`) |
| `institution` | Dark green (`#2F8F67`) |

## Replacing the Fixture With Your Own Data

To wire Coinstellation to your own graph data source:

1. Replace the contents of `src/data/coinstellation.fixture.json` with your data, matching the schema above.
2. Ensure your data source is **read-only** — no write access, no private keys.
3. If connecting to a live graph provider, build a separate server-side proxy that holds credentials outside this repository. Never commit API keys here.
4. Use clearly labeled demo addresses or sanitized public addresses only. Do not include real sensitive wallet labels or identity annotations.
5. Update `_note` and `as_of` to reflect the source and freshness.

## Live Connectors

Live graph data connectors (e.g., Alchemy, a graph indexing provider) are **out of scope** for this repository unless separately approved and scoped. This repository is intentionally fixture-only to remain publicly safe.
