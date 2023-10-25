import { pool } from '../db.js'


db.connect(err => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
  });

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
  