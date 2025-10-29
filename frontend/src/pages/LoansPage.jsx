import React, { useMemo, useState } from "react";

const LoansPage = ({ loans = [], onPay, onSettle }) => {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [payAmount, setPayAmount] = useState({});

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return loans.filter((l) => {
      if (status === "active" && l.status === "settled") return false;
      if (status === "settled" && l.status !== "settled") return false;
      if (!term) return true;
      return (
        (l.name || "").toLowerCase().includes(term) ||
        String(l.amount).includes(term) ||
        String(l.remaining).includes(term)
      );
    });
  }, [loans, q, status]);

  return (
    <div className="page loans-page">
      <div className="page-header">
        <h1 className="page-title">Loans</h1>
        <div className="header-actions loan-toolbar">
          <input
            className="loan-search"
            placeholder="Search loans, amounts or names..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="loan-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="settled">Settled</option>
          </select>
        </div>
      </div>

      <div className="card">
        <ul className="loan-list">
          {filtered.length === 0 && (
            <li className="tx-empty">No loans found</li>
          )}
          {filtered.map((l) => (
            <li key={l.id} className="loan-item">
              <div className="loan-left">
                <div className="loan-name">{l.name}</div>
                <div className="loan-meta">
                  Amount: ${l.amount} • Remaining: ${l.remaining} • Rate:{" "}
                  {l.rate}%
                </div>
                <div className="loan-progress">
                  <div
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(
                          100,
                          ((l.amount - (l.remaining || 0)) / (l.amount || 1)) *
                            100
                        )
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="loan-actions">
                <input
                  type="number"
                  className="loan-pay-input"
                  placeholder="amount"
                  value={payAmount[l.id] || ""}
                  onChange={(e) =>
                    setPayAmount((p) => ({ ...p, [l.id]: e.target.value }))
                  }
                />
                <button
                  className="btn"
                  onClick={() => {
                    const amt =
                      Number(payAmount[l.id] || 0) ||
                      Math.min(100, l.remaining || 0);
                    if (amt > 0) {
                      onPay(l.id, amt);
                      setPayAmount((p) => ({ ...p, [l.id]: "" }));
                    }
                  }}
                >
                  Pay
                </button>
                <button className="btn primary" onClick={() => onSettle(l.id)}>
                  Settle
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoansPage;
