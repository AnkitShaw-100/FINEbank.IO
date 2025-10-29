import React, { useMemo, useState } from "react";
import Transactions from "../components/TransactionsList";

const TransactionsPage = ({ transactions = [] }) => {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (!term) return true;
      return (
        (t.title || "").toLowerCase().includes(term) ||
        String(t.amount).includes(term)
      );
    });
  }, [transactions, q, typeFilter]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <div className="header-actions txn-toolbar">
          <input
            className="txn-search"
            placeholder="Search transactions, amounts, titles..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="txn-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
            <option value="info">Info</option>
          </select>
        </div>
      </div>

      <Transactions items={filtered} />
    </div>
  );
};

export default TransactionsPage;
