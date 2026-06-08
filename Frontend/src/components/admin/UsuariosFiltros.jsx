import React from 'react'

const UsuariosFiltros = ({
  filtroNombre,
  setFiltroNombre,
  filtroRol,
  setFiltroRol,
  filtroPlan,
  setFiltroPlan,
  setPaginaActual
}) => {
  return (
    <div className="barra-filtros">

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtroNombre}
        onChange={(e) => {
          setFiltroNombre(e.target.value)
          setPaginaActual(1)
        }}
      />

      <select
        value={filtroRol}
        onChange={(e) => {
          setFiltroRol(e.target.value)
          setPaginaActual(1)
        }}
      >
        <option value="">Todos los roles</option>
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>

      <select
        value={filtroPlan}
        onChange={(e) => {
          setFiltroPlan(e.target.value)
          setPaginaActual(1)
        }}
      >
        <option value="">Todos los planes</option>
        <option value="plus">Plus</option>
        <option value="premium">Premium</option>
      </select>

    </div>
  )
}

export default UsuariosFiltros