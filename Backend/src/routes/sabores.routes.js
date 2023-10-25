import {Router} from 'express'
import {nuevoSabor, listadoSabores, obtenerSabor, borrarSabor, actualizarSabor} from '../controllers/sabores.contoller.js'

const router = Router()

router.post('/new/flavor', nuevoSabor)
router.get('/flavors', listadoSabores)
router.get('/flavor/:id', obtenerSabor)
router.put('/update/flavor/:id', actualizarSabor)
router.delete('/delete/flavor/:id', borrarSabor)

export default router