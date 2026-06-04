import React from 'react'

const Membresia = () => {
  return (
   <section className="hero card">
  <div>
    <h2>Tu Membresía GourmetSaaS</h2>
    <p>
      Gestioná recetas, filtrá por ingredientes y simulá generación con IA desde
      un único panel.
    </p>
  </div>
  <div>
    <small>Recetas utilizadas</small>
    <div className="progress">
      <span />
    </div>
  </div>
  <button className="btn">Mejorar a Premium</button>
</section>

  )
}

export default Membresia