const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Routes for "proveedores"
router.get('/proveedores', controller.getAllProveedor);
router.get('/proveedores/:Id', controller.getProveedorId);
router.post('/proveedores', controller.createProveedor);
router.put('/proveedores/:Id', controller.updateProveedor);
router.delete('/proveedores/:Id', controller.deleteProveedor);

module.exports = router;