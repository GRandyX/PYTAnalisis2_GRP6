import {pool} from '../db.js'

export const listadoRellenos = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM relleno');
        res.json(rows)
    }catch(error){
        console.error('Error al obtener el listado de rellenos', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const obtenerRelleno = async(req, res) => {
    const IdRelleno = req.params.id
    try{
        const [rows] = await pool.query('SELECT * FROM relleno WHERE IdRelleno = ?', [IdRelleno])
        if (rows.length == 0){
            res.status(404).json({message: 'Relleno no encontrado'})
        }else{
            res.json(rows[0])
        }
    }catch(error){
        console.error('Error al obtener el relleno', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const nuevoRelleno = async(req, res) => {
    try{
        const {NombreRelleno, Descripcion} = req.body
        const [rows] = await pool.query('INSERT INTO relleno (NombreRelleno, Descripcion) VALUES (?, ?)',
        [NombreRelleno, Descripcion])

        res.send({
            id: rows.insertId,
            NombreRelleno,
            Descripcion
        })

    }catch(error){
        console.error('Error al registrar nuevo relleno: ', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const borrarRelleno = async(req, res) => {
    const IdRelleno = req.params.id
    try{
        const [rows] = await pool.query('DELETE FROM relleno WHERE IdRelleno = ?', [IdRelleno])
        if (rows.affectedRows == 0){
            res.status(404).json({message: 'Relleno no encontrado'})
        }else{
            res.json({message: 'Relleno eliminado correctamente'})
        }
    }catch(error){
        console.error('Error al borrar el relleno', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const actualizarRelleno = async(req, res) => {
    const IdRelleno = req.params.id
    const {NombreRelleno, Descripcion} = req.body
    try{
        const[result] = await pool.query('UPDATE relleno SET NombreRelleno = ?, Descripcion = ? WHERE IdRelleno = ?', 
        [NombreRelleno, Descripcion, IdRelleno])
        if (result.affectedRows == 0){
            res.status(404).json({message: 'Relleno no encontrado'})
        }else{
            res.json({message: 'Relleno actualizado exitosamente'})
        }
    }catch(error){
        console.error('Error al actualizar el relleno', error)
        res.status(500).send('Error interno del servidor')
    }
}