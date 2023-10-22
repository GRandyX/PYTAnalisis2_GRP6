import {pool} from '../db.js'

export const obtenerIngredientes = async(req, res) =>{
    const idPastel = req.params.id
    try{
        const [rows] = await pool.query(`SELECT ing.IdPastel, prod.Descripcion, ing.Cantidad FROM ingredientes_pasteles ing 
            INNER JOIN productos prod ON ing.IdProducto = prod.Id
            WHERE IdPastel = ?`, [idPastel])
        
        if (rows.length == 0){
            res.status(404).send('No se encontraron ingredientes')
        }else{
            res.json(rows)
        }
    }catch(error){
        console.error('Error al obtener los ingredientes', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const agregarIngrediente = async(req, res) =>{
    const {IdPastel, IdProducto, Cantidad} = req.body

    try{
        const [rows] = await pool.query('INSERT INTO ingredientes_pasteles (IdPastel, IdProducto, Cantidad) VALUES (?, ?, ?)', 
        [IdPastel, IdProducto, Cantidad])
        res.send({
            IdPastel, 
            IdProducto,
            Cantidad
        })
    }catch(error){
        console.error('Error al ingresar el ingrediente', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const actualizarIngrediente = async(req, res) =>{
    const IdPastel = req.params.idPastel
    const IdProducto = req.params.idProducto
    const {Cantidad} = req.body

    try{
        const [rows] = await pool.query('UPDATE ingredientes_pasteles SET Cantidad = ? WHERE IdPastel = ? AND IdProducto = ?',
        [Cantidad, IdPastel, IdProducto])
        res.send({
            "message": "Ingrediente actualizado correctamente",
            Cantidad
        })
    }catch(error){
        console.error('Error al actualizar el ingrediente', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const borrarIngrediente = async(req, res) => {
    const IdPastel = req.params.idPastel
    const IdProducto = req.params.idProducto
    try{
        const [rows] = await pool.query('DELETE FROM ingredientes_pasteles WHERE IdPastel = ? AND IdProducto = ?',
        [IdPastel, IdProducto])

        if (rows.affectedRows == 0){
            res.status(404).json({message: 'Ingrediente no encontrado'})
        }else{
            res.json({message: 'Ingrediente eliminado correctamente'})
        }

    }catch(error){
        console.error('Error al eliminar el ingrediente', error)
        res.status(500).send('Error interno del servidor')
    }
}