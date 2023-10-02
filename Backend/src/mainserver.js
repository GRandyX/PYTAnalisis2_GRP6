import express from 'express'
import morgan from 'morgan'
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express()

const port = process.env.port || 80
app.set('json spaces', 2)

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(usuariosRoutes)

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`))

 