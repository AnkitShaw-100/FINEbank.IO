import React from 'react'

const fmt = (n) => {
  if (n == null) return "$0.00"
  const sign = n < 0 ? "-" : ""
  const v = Math.abs(Number(n)).toFixed(2)
  return `${sign}$${v}`
}

const TransactionsList = ({ items = [] }) => {
  return (
    <div className="card transactions">
      <div className="card-title">Recent Transactions</div>
      <ul className="tx-list">
        {items.length === 0 && <li className="tx-empty">No transactions to show</li>}
        {items.map(tx => (
          <li key={tx.id} className={`tx-item ${tx.type}`}>
            <div className="tx-left">
              <div className="tx-meta">
                <div className="tx-title">{tx.title}</div>
                <div className="tx-date">{tx.date}</div>
              </div>
            </div>
            <div className="tx-amount" title={String(tx.amount)}>
              {fmt(tx.amount)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionsList
