import { pool } from '../db.js'

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Rutas para el CRUD de proveedores
app.get('/proveedores', (req, res) => {
  const query = 'SELECT * FROM proveedores';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al buscar proveedores:', err);
      res.status(500).send('Error al buscar proveedores');
      return;
    }
    res.json(result);
  });
});

app.get('/proveedores/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM proveedores WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al buscar proveedor:', err);
      res.status(500).send('Error al buscar proveedor');
      return;
    }
    res.json(result[0]);
  });
});

app.post('/proveedores', (req, res) => {
  const { nombre, direccion, telefono, email } = req.body;
  const query = 'INSERT INTO proveedores (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, direccion, telefono, email], (err, result) => {
    if (err) {
      console.error('Error al crear proveedor:', err);
      res.status(500).send('Error al crear proveedor');
      return;
    }
    res.json({ message: 'Proveedor creado con éxito', id: result.insertId });
  });
});

app.put('/proveedores/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, direccion, telefono, email } = req.body;
  const query = 'UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?';
  db.query(query, [nombre, direccion, telefono, email, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar proveedor:', err);
      res.status(500).send('Error al actualizar proveedor');
      return;
    }
    res.json({ message: 'Proveedor actualizado con éxito' });
  });
});

app.delete('/proveedores/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM proveedores WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error al eliminar proveedor:', err);
      res.status(500).send('Error al eliminar proveedor');
      return;
    }
    res.json({ message: 'Proveedor eliminado con éxito' });
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});