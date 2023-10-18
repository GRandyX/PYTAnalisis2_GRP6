import {pool} from '../db.js'


export const listadoSabores = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM SABOR');
        res.json(rows)
    }catch(error){
        console.error('Error al obtener el listado de sabores', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const obtenerSabor = async(req, res) => {
    const IdSabor = req.params.id
    try{
        const [rows] = await pool.query('SELECT * FROM SABOR WHERE IdSabor = ?', [IdSabor])
        if (rows.length == 0){
            res.status(404).json({message: 'Sabor no encontrado'})
        }else{
            res.json(rows[0])
        }
    }catch(error){
        console.error('Error al obtener el sabor', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const nuevoSabor = async(req, res) => {
    try{
        const {NombreSabor, Descripcion} = req.body
        const [rows] = await pool.query('INSERT INTO sabor (NombreSabor, Descripcion) VALUES (?, ?)',
        [NombreSabor, Descripcion])

        res.send({
            id: rows.insertId,
            NombreSabor,
            Descripcion
        })

    }catch(error){
        console.error('Error al registrar nuevo sabor: ', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const borrarSabor = async(req, res) => {
    const IdSabor = req.params.id
    try{
        const [rows] = await pool.query('DELETE FROM SABOR WHERE IdSabor = ?', [IdSabor])
        if (rows.affectedRows == 0){
            res.status(404).json({message: 'Sabor no encontrado'})
        }else{
            res.json({message: 'Sabor eliminado correctamente'})
        }
    }catch(error){
        console.error('Error al borrar el sabor', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const actualizarSabor = async(req, res) => {
    const IdSabor = req.params.id
    const {NombreSabor, Descripcion} = req.body
    try{
        const[result] = await pool.query('UPDATE sabor SET NombreSabor = ?, Descripcion = ? WHERE IdSabor = ?', 
        [NombreSabor, Descripcion, IdSabor])
        if (result.affectedRows == 0){
            res.status(404).json({message: 'Sabor no encontrado'})
        }else{
            res.json({message: 'Sabor actualizado exitosamente'})
        }
    }catch(error){
        console.error('Error al actualizar el sabor', error)
        res.status(500).send('Error interno del servidor')
    }
}