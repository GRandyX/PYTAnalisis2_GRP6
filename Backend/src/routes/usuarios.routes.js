import {Router} from 'express'
import {registrarUsuario, autenticarUsuario} from '../controllers/usuarios.controller.js'

const router = Router()

router.post('/register', registrarUsuario)
router.post('/authenticate', autenticarUsuario)

export default router