import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import { isValidObjectId } from "mongoose";

export const obtenerUsuariosService = async (page, limit, filtros = {}) => {
    limit = Number(limit) || 10;
    page = Number(page) || 1;

    const skip = (page - 1) * limit;

    const query = {};


    if (filtros.busqueda) {
        query.$or = [
            { nombre: { $regex: filtros.busqueda, $options: "i" } },
            { email: { $regex: filtros.busqueda, $options: "i" } }
        ];
    }

    if (filtros.rol) {
        query.rol = filtros.rol;
    }

    if (filtros.plan && filtros.rol !== "administrador") {
        query.plan = filtros.plan;
    }

    const totalUsuarios = await Usuario.countDocuments(query);
    const totalPages = Math.ceil(totalUsuarios / limit);

    const usuarios = await Usuario.find(query)
        .select("-password")
        .skip(skip)
        .limit(limit);

    return {
        usuarios,
        totalUsuarios,
        totalPages,
        page,
        limit
    };
};


export const obtenerUsuarioPorIdService = async (id) => {

    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findById(id).select("-password");

    if (!usuario) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    return usuario;
};

// Este servicio se puede usar para crear usuarios desde un admin, pero no para el registro público
export const crearAdministradorService = async (usuario) => {
    const { email } = usuario;

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
        const error = new Error("Ya existe un usuario con ese email");
        error.status = 409;
        throw error;
    }

    const nuevoUsuario = new Usuario({
        ...usuario,
        rol: "administrador",
        plan: undefined
    });

    await nuevoUsuario.save();

    const usuarioSinPassword = nuevoUsuario.toObject();
    delete usuarioSinPassword.password;

    return usuarioSinPassword;
};

export const actualizarUsuarioService = async (id, usuario) => {

    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const { email, password, plan, ...datosPermitidos } = usuario;

    let datosActualizados = { ...datosPermitidos };

    if (email) {
        const usuarioExistente = await Usuario.findOne({
            email,
            _id: { $ne: id }
        });

        if (usuarioExistente) {
            const error = new Error("Ya existe un usuario con ese email");
            error.status = 409;
            throw error;
        }

        datosActualizados.email = email;
    }

    if (password) {
        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        datosActualizados.password = passwordHash;
    }

    if (datosActualizados.rol === "administrador") {
        datosActualizados.plan = undefined;
    }

    if (datosActualizados.rol === "usuario") {
        datosActualizados.plan = "plus";
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        datosActualizados,
        { returnDocument: "after" }
    ).select("-password");

    if (!usuarioActualizado) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    return usuarioActualizado;
};

export const eliminarUsuarioService = async (id) => {

    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const usuarioEliminado = await Usuario.findByIdAndDelete(id).select("-password");

    if (!usuarioEliminado) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    return usuarioEliminado;
};

export const cambiarPlanAPremiumService = async (usuarioId) => {
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    if (usuario.plan !== "plus") {
        const error = new Error("Solo los usuarios con plan plus pueden cambiar a premium");
        error.status = 400;
        throw error;
    }

    if (usuario.rol !== "usuario") {
        const error = new Error("Este perfil de usuario no puede cambiar de plan");
        error.status = 403;
        throw error;
    }

    usuario.plan = "premium";
    await usuario.save();

    const usuarioSinPassword = usuario.toObject();
    delete usuarioSinPassword.password;

    return usuarioSinPassword;
};