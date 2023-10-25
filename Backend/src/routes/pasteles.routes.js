import {Router} from 'express'
import {listadoPasteles, nuevoPastel, borrarPastel, obtenerPastel, actualizarPastel} from '../controllers/pasteles.controller.js'

const router = Router()

router.post('/new/cake', nuevoPastel)
router.get('/cakes', listadoPasteles)
router.get('/cake/:id', obtenerPastel)
router.put('/update/cake/:id', actualizarPastel)
router.delete('/delete/cake/:id', borrarPastel)

export default router