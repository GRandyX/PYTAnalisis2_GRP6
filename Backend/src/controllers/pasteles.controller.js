import {pool} from '../db.js'
import fs from 'fs';
import { v4 as uuid  } from 'uuid';

const urlFrontend = "http://localhost:4200/assets/pasteles/";
const pathImagen = "C:\\'Ruta donde esta el proyecto'\\PYTAnalisis2_GRP6\\Frontend\\src\\assets\\pasteles\\";

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
        const [rows] = await pool.query('SELECT * FROM pasteles WHERE Id = ?', [IdPastel])
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
            var {NombrePastel, IdSabor, IdFamilia, IdRelleno, Descripcion, Costo, Precio, Existencia, UrlImagen} = req.body
            UrlImagen = uploadFile(UrlImagen, pathImagen);

            const [rows] = await pool.query('INSERT INTO pasteles (Id, IdFamilia, NombrePastes, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia, UrlImagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nuevoId, IdFamilia, NombrePastel, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia, UrlImagen])
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

export const actualizarPastel = async(req, res) => {
    const IdPastel = req.params.id
    var {IdFamilia, NombrePastel, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia, UrlImagen} = req.body
    UrlImagen = uploadFile(UrlImagen, pathImagen);

    try{
        const[result] = await pool.query('UPDATE pasteles SET IdFamilia = ?, NombrePastes = ?, IdSabor = ?, IdRelleno = ?, Descripcion = ?, Costo = ?, Precio = ?, Existencia = ?, UrlImagen = ? WHERE Id = ?',
        [IdFamilia, NombrePastel, IdSabor, IdRelleno, Descripcion, Costo, Precio, Existencia, UrlImagen, IdPastel])
        if (result.affectedRows == 0){
            res.status(404).json({message: 'Pastel no encontrado'})
        }else{
            res.json({message: 'Pastel actualizado exitosamente'})
        }
    }catch(error){
        console.error('Error al actualizar el pastel', error)
        res.status(500).send('Error interno del servidor')
    }
}

const uploadFile = (file_base64, path) => {
    var file = file_base64.split(','),
        file_extension = file[0].split('/')[1].replace(';base64', ''),
        file_decoded = Buffer.from(file[1], 'base64'),
        file_name = `${uuid()}.${file_extension}`;
    fs.writeFileSync(path + file_name, file_decoded, "binary");

    let UrlImagen = urlFrontend + file_name;
    return UrlImagen;
}