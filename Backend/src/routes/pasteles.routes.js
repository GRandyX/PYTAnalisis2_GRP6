import {Router} from 'express'
import {listadoPasteles, nuevoPastel, borrarPastel} from '../controllers/pasteles.controller.js'

const router = Router()

router.post('/new/cake', nuevoPastel)
router.get('/cakes', listadoPasteles)
router.delete('/delete/cake/:id', borrarPastel)

export default router