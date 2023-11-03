class ManejadorDescripcion {

	constructor() {
		this.siguiente = null;
	}

	setSiguiente(siguiente) {
		this.siguiente = siguiente;
	}

	obtenerDescripcion(descripcion) {
		if (this.siguiente) {
			return this.siguiente.obtenerDescripcion(descripcion);
		}

		return "Delisioso pastel con turron y crema";
	}
}

module.exports = ManejadorDescripcion;
