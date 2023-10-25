import { Authenticator } from '../utils/authenticator.util.js'
import {pool} from '../db.js'

export const registrarUsuario = async (req, res) => {
    try{

      const {NombreCompleto, Usuario, Contrasena, IdPermiso} = req.body
      const encryptedPas = await Authenticator.hashPass(Contrasena)
      const [rows] = await pool.query('INSERT INTO usuario (NombreCompleto, Usuario, Contrasena, IdPermiso) VALUES (?, ?, ?, ?)',
      [NombreCompleto, Usuario,encryptedPas, IdPermiso])

      res.send({
        id: rows.insertId,
        Usuario,
        IdPermiso
      })

    }catch(error){
      console.error('error al registrar: ', error)
      res.status(500).send('Error interno del servidor')
    }
  }

export const autenticarUsuario = async (req, res) => {
  try{
    const {Usuario, Contrasena} = req.body
    const [rows] = await pool.query('SELECT * FROM usuario WHERE Usuario = ?', [Usuario])

    if (rows.length === 0) {
      res.status(400).json({ error: "Usuario no encontrado" });
      return;
    }else{

      const authenticatePass = await Authenticator.comparePass(Contrasena, rows[0].Contrasena)


      if (authenticatePass) {
        res.json({
          status: "True",
          Id: rows[0].id,
          Usuario,
          IdPermiso: rows[0].IdPermiso,
        });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
      }

    }

  }catch(error){
    console.error('error al autenticar: ', error)
    res.status(500).send('Error interno del servidor')
  }
}