import {pool} from '../db.js'

export const listadoPasteles = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM pasteles');
        res.json(rows)
    }catch(error){
        console.error('Error al obtener el listado de pasteles', error)
        res.status(500).send('Error interno del servidor')
    }
}


export const obtenerPastel = async(req, res) => {
    const IdPastel = req.params.id
    try{
        const [rows] = await pool.query('SELECT * FROM pastel WHERE Id = ?', [IdPastel])
        if (rows.length == 0){
            res.status(404).json({message: 'Pastel no encontrado'})
        }else{
            res.json(rows[0])
        }
    }catch(error){
        console.error('Error al obtener el pastel', error)
        res.status(500).send('Error interno del servidor')
    }
}


export const nuevoPastel = async(req, res) => {
    try{
        const [resultId] = await pool.query('SELECT MAX(Id) AS maxId FROM pasteles')
        let nuevoId
        if (resultId[0].maxId == null){
            nuevoId = 1
        }else{
            nuevoId = resultId[0].maxId + 1
        }

        try{
            const {NombrePastel, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia} = req.body
            const [rows] = await pool.query('INSERT INTO pasteles (Id, NombrePastes, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nuevoId, NombrePastel, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia])
            res.send({
                nuevoId,
                NombrePastel,
                Descripcion
            })
        }catch(error){
            console.error('Error al registrar nuevo pastel: ', error)
            res.status(500).send('Error interno del servidor')
        }

    }catch(error){
        console.error('Error al obtener Id del Pastel: ', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const borrarPastel = async(req, res) => {
    const IdPastel = req.params.id
    try{
        const [rows] = await pool.query('DELETE FROM pasteles WHERE Id = ?', [IdPastel])
        if (rows.affectedRows == 0){
            res.status(404).json({message: 'Pastel no encontrado'})
        }else{
            res.json({message: 'Pastel eliminado correctamente'})
        }
    }catch(error){
        console.error('Error al borrar el pastel', error)
        res.status(500).send('Error interno del servidor')
    }
}