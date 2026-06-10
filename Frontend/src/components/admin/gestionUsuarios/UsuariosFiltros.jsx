import React from 'react'

const UsuariosFiltros = ({
  filtroBusqueda,
  setFiltroBusqueda,
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
        placeholder="Buscar por nombre o email..."
        value={filtroBusqueda}
        onChange={(e) => {
          setFiltroBusqueda(e.target.value)
          setPaginaActual(1)
        }}
      />

      <select
        value={filtroRol}
        onChange={(e) => {
          const nuevoRol = e.target.value

          setFiltroRol(nuevoRol)

          if (nuevoRol === 'administrador') {
            setFiltroPlan('')
          }

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
        disabled={filtroRol === 'administrador'}
      >
        <option value="">No aplica</option>
        <option value="plus">Plus</option>
        <option value="premium">Premium</option>
      </select>
    </div>
  )
}

export default UsuariosFiltros
