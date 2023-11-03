const ManejadorDescripcion = require('./ManejadorDescripcion');

class Relleno extends ManejadorDescripcion {
	constructor(idRelleno, nombre, descripcion) {
		super();
		this.idRelleno = idRelleno;
		this.nombre = nombre;
		this.descripcion = descripcion;
	}

	obtenerDescripcion(descripcion) {
		if (this.descripcion !== null) {
			return this.descripcion;
		} else {
			return super.obtenerDescripcion(descripcion); // Pasa el argumento 'descripcion' aquí
		}
	}
}

module.exports = Relleno;
