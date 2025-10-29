import React, { useState } from 'react'

const LoanForm = ({ onAdd }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [dueDate, setDueDate] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name || !amount) return
    onAdd({ name, amount: Number(amount), rate: Number(rate || 0), dueDate })
    setName('')
    setAmount('')
    setRate('')
    setDueDate('')
    setOpen(false)
  }

  return (
    <div className="loan-form">
      <button className="btn primary" onClick={() => setOpen(true)}>+ New Loan</button>
      {open && (
        <div className="modal">
          <form onSubmit={submit} className="modal-card">
            <h3>Create Loan</h3>
            <label>Loan name</label>
            <input value={name} onChange={e => setName(e.target.value)} />
            <label>Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <label>Interest rate (%)</label>
            <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} />
            <label>Due date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
              <button type="submit" className="btn primary">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default LoanForm
