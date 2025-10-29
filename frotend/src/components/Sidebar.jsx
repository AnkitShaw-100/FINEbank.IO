import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">FINEbank.IO</div>
      </div>
      <nav className="menu">
        <NavLink to="/" end className={({isActive}) => `menu-item ${isActive? 'active':''}`}>Overview</NavLink>
        <NavLink to="/loans" className={({isActive}) => `menu-item ${isActive? 'active':''}`}>Loans</NavLink>
        <NavLink to="/transactions" className={({isActive}) => `menu-item ${isActive? 'active':''}`}>Transactions</NavLink>
        <NavLink to="/bills" className={({isActive}) => `menu-item ${isActive? 'active':''}`}>Bills</NavLink>
        <NavLink to="/goals" className={({isActive}) => `menu-item ${isActive? 'active':''}`}>Goals</NavLink>
        <NavLink to="/settings" className={({isActive}) => `menu-item ${isActive? 'active':''}`}>Settings</NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user">
          <div className="avatar">AM</div>
          <div className="user-info">
            <div className="name">Anushka Maity</div>
            <div className="role">View profile</div>
          </div>
        </div>
        <NavLink to="/login" className="logout">Logout</NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
