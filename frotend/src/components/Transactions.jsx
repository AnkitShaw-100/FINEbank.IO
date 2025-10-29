import React from 'react'

const Transactions = ({ items = [] }) => {
  return (
    <div className="card transactions">
      <div className="card-title">Recent Transactions</div>
      <ul className="tx-list">
        {items.map(tx => (
          <li key={tx.id} className={`tx-item ${tx.type}`}>
            <div className="tx-left">
              <div className="tx-title">{tx.title}</div>
              <div className="tx-date">{tx.date}</div>
            </div>
            <div className="tx-amount">{tx.amount < 0 ? `-$${Math.abs(tx.amount)}` : `$${tx.amount}`}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transactions
