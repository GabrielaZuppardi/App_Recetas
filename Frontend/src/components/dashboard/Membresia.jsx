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

  const limiteRecetas = 4

  const porcentaje = esPlus
    ? Math.min((cantidadRecetas / limiteRecetas) * 100, 100)
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
        <h2>
          {esPremium ? "Plan Premium" : "Plan Plus"}
        </h2>

        <p>
          {esPremium
            ? "Ahora podes disfrutar de guardar recetas ilimitadas!"
            : "En tu plan Plus disponés de un límite de 4 recetas para guardar."}
        </p>
      </div>

      <div>
        <small>
          {esPremium
            ? `${cantidadRecetas} recetas creadas`
            : `${cantidadRecetas}/${limiteRecetas} recetas utilizadas`}
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