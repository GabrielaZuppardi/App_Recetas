import React from 'react'

const NavBar = () => {
  return (
   <header className="navbar card">
  <div className="brand">
    <div className="logo">🍳</div>
    <div>
      <h1>GourmetSaaS</h1>
      <p>Panel simplificado de recetas inteligentes</p>
    </div>
  </div>
  <div className="user-area">
    <span className="pill">Plan Plus · 3/4 recetas</span>
    <span className="pill">Gabriela</span>
    <button className="btn secondary">Cerrar sesión</button>
  </div>
</header>

  )
}

export default NavBar