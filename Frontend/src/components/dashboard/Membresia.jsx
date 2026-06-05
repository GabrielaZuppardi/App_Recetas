import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api/api'
import { guardarUsuarioLogueado } from '../../features/usuarios.slice'

const Membresia = () => {

  const dispatch = useDispatch()

  const usuarioRedux = useSelector(state => state.usuarios.usuarioLogueado)
  const recetas = useSelector(state => state.recetas.recetas)

  const usuarioLocal = JSON.parse(localStorage.getItem("usuario"))

  const usuario = usuarioRedux || usuarioLocal

  const cantidadRecetas = recetas.length

  const esPlus = usuario?.plan === "plus"
  const esPremium = usuario?.plan === "premium"

  const porcentaje = esPlus
    ? (cantidadRecetas / 4) * 100
    : 100

  const pasarAPremium = () => {
    api.patch('/usuarios/premium')
      .then(res => {
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario))

        dispatch(guardarUsuarioLogueado(res.data.usuario))
      })
      .catch(err => {
        console.error('Error al pasar a premium:', err)
      })
  }

  return (
    <section className="hero card">
      <div>
        <h2>App Recetas</h2>
        <p>
          Gestioná recetas, filtrá por ingredientes y simulá generación con IA desde
          un único panel.
        </p>
      </div>

      <div>
        <small>
          {esPlus
            ? `${cantidadRecetas}/4 recetas utilizadas`
            : `${cantidadRecetas} recetas creadas`}
        </small>

        <div className="progress">
          <span style={{ width: `${porcentaje}%` }} />
        </div>
      </div>

      {esPlus && (
        <button className="btn" onClick={pasarAPremium}>
          Mejorar a Premium
        </button>
      )}
    </section>
  )
}

export default Membresia