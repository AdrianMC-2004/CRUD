
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const createUsuario = require('./create');
const deleteUsuario = require('./delete'); 
const getUsuarios = require('./read'); 
const updateUsuario = require('./update'); 


const app = express();
const port = 3000; 


app.use(cors()); 
app.use(bodyParser.json()); 


app.get('/api/usuarios', (req, res) => {
  getUsuarios((err, rows) => {
    if (err) {
      
      res.status(500).json({ error: err.message });
    } else {
      
      res.json(rows);
    }
  });
});


app.post('/api/usuarios', (req, res) => {
  const { nombre, correo } = req.body; 
  createUsuario(nombre, correo, (err, user) => {
    if (err) {
      
      res.status(500).json({ error: err.message });
    } else {
      
      res.status(201).json(user);
    }
  });
});


app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; 
  deleteUsuario(id, (err) => {
    if (err) {
      
      res.status(500).json({ error: err.message });
    } else {
      
      res.status(204).end();
    }
  });
});


app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; 
  const { nombre, correo } = req.body; 
  updateUsuario(id, nombre, correo, (err) => {
    if (err) {
      
      res.status(500).json({ error: err.message });
    } else {
      
      res.status(204).end();
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`); // Mensaje de confirmación
});
