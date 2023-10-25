import {Router} from 'express'
import {listadoFamilias, obtenerFamilia, actualizarFamilia, borrarFamilia, agregarFamilia} from '../controllers/familia_pastel.controller.js'

const router = Router()

router.get('/families', listadoFamilias)
router.post('/new/family', agregarFamilia)
router.get('/families/:idFamilia', obtenerFamilia)
router.put('/update/family/:idFamilia', actualizarFamilia)
router.delete('/delete/family/:idFamilia', borrarFamilia)

export default router