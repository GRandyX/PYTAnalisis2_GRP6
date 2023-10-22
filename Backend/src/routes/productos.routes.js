import { Router } from 'express'
import {listadoProductos, obtenerProducto, nuevoProducto, borrarProducto, actualizarProducto} from '../controllers/productos.controller.js'

const router = Router()


router.post('/new/product', nuevoProducto)
router.get('/products', listadoProductos)
router.get('/products/:id', obtenerProducto)
router.put('/update/product/:id', actualizarProducto)
router.delete('/delete/product/:id', borrarProducto)

export default router
