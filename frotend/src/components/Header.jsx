import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="search">
        <input placeholder="Search here" />
      </div>
      <div className="header-right">
        <div className="notif">🔔</div>
        <div className="profile">Tanzir</div>
      </div>
    </header>
  )
}

export default Header
