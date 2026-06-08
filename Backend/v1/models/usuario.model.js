import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["usuario", "administrador"],
    default: "usuario"
  },
  plan: {
    type: String,
    enum: ["plus", "premium"],
    default: undefined
  }
});

usuarioSchema.pre("validate", function () {
  if (this.rol === "administrador") {
    this.plan = undefined;
  }

  if (this.rol === "usuario" && !this.plan) {
    this.plan = "plus";
  }
});

usuarioSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  const saltRounds = Number(process.env.SALT_ROUNDS) || 12;
  const salt = bcrypt.genSaltSync(saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
});

export default mongoose.model("Usuario", usuarioSchema);