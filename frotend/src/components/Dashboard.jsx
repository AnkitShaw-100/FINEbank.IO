import React, { useState } from 'react'
import Transactions from './Transactions'

const Dashboard = ({ loans = [], transactions = [], onPay, onSettle }) => {
  const totalBalance = loans.reduce((s, l) => s + (l.remaining || 0), 0)
  const [payAmount, setPayAmount] = useState({})

  return (
    <div className="dashboard">
      <div className="cards-row">
        <div className="card balance">
          <div className="card-title">Total Balance</div>
          <div className="card-value">${totalBalance.toLocaleString()}</div>
          <div className="card-sub">All active loans remaining</div>
        </div>
        <div className="card goals">
          <div className="card-title">Goals</div>
          <div className="card-value">$20,000</div>
          <div className="goal-progress"><div style={{width:'60%'}} /></div>
        </div>
        <div className="card upcoming">
          <div className="card-title">Upcoming Bill</div>
          <div className="up-item">Figma - Monthly <span className="muted">$150</span></div>
          <div className="up-item">Adobe - Yearly <span className="muted">$559</span></div>
        </div>
      </div>

      <div className="main-grid">
        <div className="left-col">
          <Transactions items={transactions} />
          <div className="card stats">
            <div className="card-title">Weekly Comparison</div>
            <div className="bar-chart">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=> (
                <div key={d} className="bar">
                  <div className="bar-this" style={{height: `${40 + i*6}px`}} />
                  <div className="bar-label">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="card loans">
            <div className="card-title">Loans</div>
            <ul className="loan-list">
              {loans.map(l => (
                <li key={l.id} className="loan-item">
                  <div className="loan-left">
                    <div className="loan-name">{l.name}</div>
                    <div className="loan-meta">Remaining: ${l.remaining} • Rate: {l.rate}%</div>
                  </div>
                  <div className="loan-actions">
                    <input type="number" placeholder="amount" value={payAmount[l.id]||''} onChange={e => setPayAmount(prev=>({ ...prev, [l.id]: e.target.value }))} />
                    <button className="btn" onClick={() => { const amt = Number(payAmount[l.id]||0); if (amt>0) onPay(l.id, amt); setPayAmount(prev=>({ ...prev, [l.id]: ''})); }}>Pay</button>
                    <button className="btn primary" onClick={() => onSettle(l.id)}>Settle</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card breakdown">
            <div className="card-title">Expenses Breakdown</div>
            <div className="break-grid">
              <div className="break-item">Housing<span>$250</span></div>
              <div className="break-item">Food<span>$350</span></div>
              <div className="break-item">Transport<span>$50</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
