import React, { useState, useRef, useEffect } from "react";

const formatCurrency = (v) => {
  if (v === "" || v == null) return "";
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const LoanForm = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter a loan name");
    const amt = Number(amount);
    if (!amt || amt <= 0) return setError("Please enter a valid amount");
    const r = Number(rate || 0);
    onAdd({
      name: name.trim(),
      amount: amt,
      rate: r,
      dueDate: dueDate || null,
      notes: notes || "",
    });
    setName("");
    setAmount("");
    setRate("");
    setDueDate("");
    setNotes("");
    setOpen(false);
  }

  function clickOutside(e) {
    if (modalRef.current && !modalRef.current.contains(e.target))
      setOpen(false);
  }

  const presets = [500, 1000, 5000, 10000];

  return (
    <div className="loan-form">
      <button className="btn primary" onClick={() => setOpen(true)}>
        + New Loan
      </button>
      {open && (
        <div
          className="modal"
          onMouseDown={clickOutside}
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={submit}
            className="modal-card"
            ref={modalRef}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>Create Loan</h3>
              <button
                type="button"
                className="btn"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="field-error" style={{ marginTop: 8 }}>
                {error}
              </div>
            )}

            <label>Loan name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Car loan"
              autoFocus
            />

            <label>Amount</label>
            <div className="input-with-addon">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
              <div className="addon">USD</div>
            </div>

            <div className="preset-buttons" style={{ marginTop: 8 }}>
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="btn ghost"
                  onClick={() => setAmount(String(p))}
                >
                  ${formatCurrency(p)}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <div style={{ flex: 1 }}>
                <label>Interest rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 5.5"
                />
              </div>
              <div style={{ width: 160 }}>
                <label>Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <label style={{ marginTop: 10 }}>Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about this loan"
              rows={3}
            />

            <div className="modal-actions" style={{ marginTop: 12 }}>
              <button
                type="button"
                className="btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Create loan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoanForm;
