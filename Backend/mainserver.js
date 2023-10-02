const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));

