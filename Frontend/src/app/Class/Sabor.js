const ManejadorDescripcion = require('./ManejadorDescripcion');

class Sabor extends ManejadorDescripcion {
	constructor(idSabor, nombre, descripcion) {
		super();
		this.idSabor = idSabor;
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

module.exports = Sabor;
