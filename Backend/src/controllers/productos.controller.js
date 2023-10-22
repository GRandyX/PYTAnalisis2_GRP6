import {pool} from  '../db.js'

export const listadoProductos = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows)
    }catch(error){
        console.error('Error al obtener el listado de productos', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const obtenerProducto = async(req, res) => {
    const IdPastel = req.params.id
    try{
        const [rows] = await pool.query('SELECT * FROM productos WHERE Id = ?', [IdPastel])
        if (rows.length == 0){
            res.status(404).json({message: 'Producto no encontrado'})
        }else{
            res.json(rows[0])
        }
    }catch(error){
        console.error('Error al obtener el producto', error)
        res.status(500).send('Error interno del servidor')
    }
}


export const nuevoProducto = async(req, res) => {
    try{
        const [resultId] = await pool.query('SELECT MAX(Id) AS maxId FROM productos')
        let nuevoId
        if (resultId[0].maxId == null){
            nuevoId = 1
        }else{
            nuevoId = resultId[0].maxId + 1
        }

        try{
            const {Descripcion, Costo, IdProveedor, Existencia} = req.body
            const [rows] = await pool.query('INSERT INTO productos (Id, Descripcion, Costo, IdProveedor, Existencia) VALUES (?, ?, ?, ?, ?)',
            [nuevoId, Descripcion, Costo, IdProveedor, Existencia])
            res.send({
                nuevoId,
                Descripcion,
            })
        }catch(error){
            console.error('Error al registrar nuevo producto: ', error)
            res.status(500).send('Error interno del servidor')
        }

    }catch(error){
        console.error('Error al obtener Id del Producto: ', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const borrarProducto = async(req, res) => {
    const Id = req.params.id
    try{
        const [rows] = await pool.query('DELETE FROM productos WHERE Id = ?', [Id])
        if (rows.affectedRows == 0){
            res.status(404).json({message: 'Producto no encontrado'})
        }else{
            res.json({message: 'Producto eliminado correctamente'})
        }
    }catch(error){
        console.error('Error al borrar el producto', error)
        res.status(500).send('Error interno del servidor')
    }
}

export const actualizarProducto = async(req, res) => {
    const Id = req.params.id
    const {Descripcion, Costo, IdProveedor, Existencia} = req.body
    try{
        const[result] = await pool.query('UPDATE productos SET Descripcion = ?, Costo = ?, IdProveedor = ?, Existencia = ? WHERE Id = ?', 
        [Descripcion, Costo, IdProveedor, Existencia, Id])
        if (result.affectedRows == 0){
            res.status(404).json({message: 'Producto no encontrado'})
        }else{
            res.json({message: 'Producto actualizado exitosamente'})
        }
    }catch(error){
        console.error('Error al actualizar el producto', error)
        res.status(500).send('Error interno del servidor')
    }
}