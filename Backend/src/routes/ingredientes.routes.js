import {Router} from 'express'
import {obtenerIngredientes, agregarIngrediente, actualizarIngrediente, borrarIngrediente} from '../controllers/ingredientes.controller.js'

const router = Router()

router.post('/new/ingredient', agregarIngrediente)
router.get('/ingredients/:id', obtenerIngredientes)
router.put('/update/ingredients/:idPastel/:idProducto', actualizarIngrediente)
router.delete('/delete/ingredient/:idPastel/:idProducto', borrarIngrediente)

export default router