import React from 'react'
import { useSelector } from 'react-redux'

const Cuenta = () => {
const cuentaActual = useSelector((state) => state.contador.cuenta);

  return (
    <div>
         <h1>{cuentaActual}</h1>

    </div>
  )
}

export default Cuenta