import {pool} from  '../db.js'

export const listadoFamilias = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM familia_pasteles');
        res.json(rows)
    }catch(error){
        console.error('Error al obtener el listado de familias', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const obtenerFamilia = async(req, res) => {
    const IdFamilia = req.params.idFamilia
    try{
        const [rows] = await pool.query('SELECT * FROM familia_pasteles WHERE IdFamilia = ?', [IdFamilia])
        if (rows.length == 0){
            res.status(404).json({message: 'Familia de pasteles no encontrada'})
        }else{
            res.json(rows[0])
        }
    }catch(error){
        console.error('Error al obtener la familia de pasteles', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const agregarFamilia = async(req, res) =>{
    const {NombreFamilia} = req.body
    try{
        const [rows] = await pool.query('INSERT INTO familia_pasteles (NombreFamilia) VALUES (?)', 
        [NombreFamilia])
        res.send({
            NombreFamilia, 
        })
    }catch(error){
        console.error('Error al ingresar la familia', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const actualizarFamilia = async(req, res) =>{
    const IdFamilia = req.params.idFamilia
    const {NombreFamilia} = req.body

    try{
        const [rows] = await pool.query('UPDATE familia_pasteles SET NombreFamilia = ? WHERE IdFamilia = ?',
        [NombreFamilia, IdFamilia])
        res.send({
            "message": "Familia de pasteles actualizada correctamente",
            NombreFamilia
        })
    }catch(error){
        console.error('Error al actualizar la familia de pasteles', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const borrarFamilia = async(req, res) => {
    const IdFamilia = req.params.idFamilia
    try{
        const [rows] = await pool.query('DELETE FROM familia_pasteles WHERE IdFamilia = ?',
        [IdFamilia])

        if (rows.affectedRows == 0){
            res.status(404).json({message: 'Familia no encontrada'})
        }else{
            res.json({message: 'Familia de pasteles eliminada correctamente'})
        }

    }catch(error){
        console.error('Error al eliminar la familia de pasteles', error)
        res.status(500).send('Error interno del servidor')
    }
}
