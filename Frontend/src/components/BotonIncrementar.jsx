import React from 'react'
import { incrementar } from '../features/contador.slice'
import { useDispatch } from 'react-redux'

const BotonIncrementar = () => {

    const dispatch = useDispatch();
    const incrementarCuenta = () => {
        dispatch(incrementar()); 
    }

    return (
        <div>
            <input type="button" value="Incrementar" onClick={incrementarCuenta} />
        </div>
    )
}



export default BotonIncrementar