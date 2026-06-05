import dotenv from 'dotenv'
import connectDB from '../config/db.config.js'
import Categoria from '../models/categoria.model.js'

dotenv.config({ path: '../../.env' })

const defaultCategorias = [
  { nombre: 'desayunos' },
  { nombre: 'pasta' },
  { nombre: 'carnes' },
  { nombre: 'pescados' },
  { nombre: 'postres' }
]

const seed = async () => {
  try {
    await connectDB()

    const count = await Categoria.countDocuments()
    if (count > 0) {
      console.log(`La colección ya tiene ${count} categorías. No se insertaron.`)
      process.exit(0)
    }

    const docs = defaultCategorias.map(c => ({ ...c, nombre: c.nombre.trim().toLowerCase() }))
    const inserted = await Categoria.insertMany(docs)
    console.log(`Insertadas ${inserted.length} categorías.`)
    process.exit(0)
  } catch (err) {
    console.error('Error seed categorias:', err)
    process.exit(1)
  }
}

seed()
