import {Router} from 'express'
import {nuevoRelleno, listadoRellenos, obtenerRelleno, borrarRelleno, actualizarRelleno} from '../controllers/rellenos.controller.js'

const router = Router()

router.post('/new/filling', nuevoRelleno)
router.get('/fillings', listadoRellenos)
router.get('/filling/:id', obtenerRelleno)
router.put('/update/filling/:id', actualizarRelleno)
router.delete('/delete/filling/:id', borrarRelleno)

export default router