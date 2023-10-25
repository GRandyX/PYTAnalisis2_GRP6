import express from 'express'
import morgan from 'morgan'
import usuariosRoutes from './routes/usuarios.routes.js'
import saboresRoutes from './routes/sabores.routes.js'
import rellenosRoutes from './routes/rellenos.routes.js'
import pastelesRoutes from './routes/pasteles.routes.js'
import productosRoutes from './routes/productos.routes.js'
import ingredientsRoutes from './routes/ingredientes.routes.js'
import familiesRoutes from './routes/familia_pastel.routes.js'
import cors from 'cors'

const app = express()

const port = process.env.port || 8000
app.set('json spaces', 2)

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api',usuariosRoutes)
app.use('/api', saboresRoutes)
app.use('/api', rellenosRoutes)
app.use('/api', pastelesRoutes)
app.use('/api', productosRoutes)
app.use('/api', ingredientsRoutes)
app.use('/api', familiesRoutes)

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`))

