const ManejadorDescripcion = require('./ManejadorDescripcion');

class Pastel extends ManejadorDescripcion {
	constructor(idPastel, nombre, precio, ingredientes, imagen, descripcion, idSabor, idRelleno) {
		super();
		this.idPastel = idPastel;
		this.nombre = nombre;
		this.precio = precio;
		this.ingredientes = ingredientes;
		this.imagen = imagen;
		this.descripcion = descripcion;
		this.idSabor = idSabor;
		this.idRelleno = idRelleno;
	}

	obtenerDescripcion(descripcion) {
		if (this.descripcion !== null) {
			return this.descripcion;
		} else {
			return super.obtenerDescripcion(descripcion); // Pasa el argumento 'descripcion' aquí
		}
	}
}

module.exports = Pastel;

