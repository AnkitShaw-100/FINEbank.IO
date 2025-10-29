import React, { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import LoanForm from './components/LoanForm'

const initialLoans = [
  { id: 1, name: 'Car Loan', amount: 15000, remaining: 8000, rate: 6.5, dueDate: '2025-11-15', status: 'active' },
  { id: 2, name: 'Personal Loan', amount: 5000, remaining: 1200, rate: 8.2, dueDate: '2026-02-01', status: 'active' },
]

const initialTransactions = [
  { id: 1, title: 'Payment received', amount: 300, date: '2025-10-25', type: 'credit' },
  { id: 2, title: 'Payment to lender', amount: -150, date: '2025-10-20', type: 'debit' },
  { id: 3, title: 'New loan created', amount: 15000, date: '2025-09-01', type: 'credit' },
]

const App = () => {
  const [loans, setLoans] = useState(initialLoans)
  const [transactions, setTransactions] = useState(initialTransactions)

  function addLoan(loan) {
    const id = Date.now()
    const newLoan = { id, ...loan, remaining: loan.amount, status: 'active' }
    setLoans((s) => [newLoan, ...s])
    setTransactions((t) => [{ id: Date.now() + 1, title: `Loan created: ${loan.name}`, amount: loan.amount, date: new Date().toISOString().slice(0,10), type: 'credit' }, ...t])
  }

  function makePayment(loanId, amount) {
    setLoans((list) => list.map(l => {
      if (l.id === loanId) {
        const remaining = Math.max(0, (l.remaining || 0) - amount)
        const status = remaining === 0 ? 'settled' : l.status
        return { ...l, remaining, status }
      }
      return l
    }))
    setTransactions((t) => [{ id: Date.now(), title: `Payment for loan #${loanId}`, amount: -amount, date: new Date().toISOString().slice(0,10), type: 'debit' }, ...t])
  }

  function settleLoan(loanId) {
    setLoans((list) => list.map(l => l.id === loanId ? { ...l, remaining: 0, status: 'settled' } : l))
    setTransactions((t) => [{ id: Date.now(), title: `Loan settled #${loanId}`, amount: 0, date: new Date().toISOString().slice(0,10), type: 'info' }, ...t])
  }

  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="content">
          <div className="top-row">
            <h1>Loan Management Dashboard</h1>
            <LoanForm onAdd={addLoan} />
          </div>
          <Dashboard loans={loans} transactions={transactions} onPay={makePayment} onSettle={settleLoan} onAddLoan={addLoan} />
        </main>
      </div>
    </div>
  )
}

export default App
