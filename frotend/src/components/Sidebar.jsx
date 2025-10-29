import React from 'react'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">FINEbank.IO</div>
      <nav className="menu">
        <button className="menu-item active">Overview</button>
        <button className="menu-item">Balances</button>
        <button className="menu-item">Transactions</button>
        <button className="menu-item">Bills</button>
        <button className="menu-item">Expenses</button>
        <button className="menu-item">Goals</button>
        <button className="menu-item">Settings</button>
      </nav>
      <div className="sidebar-footer">
        <div className="user">
          <div className="avatar">TR</div>
          <div className="user-info">
            <div className="name">Tanzir Rahman</div>
            <div className="role">View profile</div>
          </div>
        </div>
        <button className="logout">Logout</button>
      </div>
    </aside>
  )
}

export default Sidebar
