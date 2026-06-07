import React from 'react'

const ModalUsuario = ({ usuario, onClose }) => {

    if (!usuario) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">

                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2>Detalle del usuario</h2>

                <div className="user-info">
                    <p><strong>Nombre:</strong> {usuario.nombre} </p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Rol:</strong> {usuario.rol}</p>
                    <p><strong>Plan:</strong> {usuario.plan}</p>
                </div>

            </div>
        </div>
    )
}

export default ModalUsuario