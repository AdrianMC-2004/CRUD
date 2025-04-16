// Importación de las dependencias necesarias
const express = require('express'); // Framework para el servidor web
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes JSON
const createUsuario = require('./create'); // Función para crear un nuevo usuario
const deleteUsuario = require('./delete'); // Función para eliminar un usuario
const getUsuarios = require('./read'); // Función para obtener usuarios
const updateUsuario = require('./update'); // Función para actualizar un usuario

// Inicialización de la aplicación Express
const app = express();
const port = 3000; // Puerto donde el servidor escuchará las solicitudes

// Configuración de middlewares
app.use(cors()); // Habilita CORS para permitir solicitudes de otros dominios
app.use(bodyParser.json()); // Analiza las solicitudes entrantes con cuerpo JSON

// Ruta GET para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  getUsuarios((err, rows) => {
    if (err) {
      // Si ocurre un error, respondemos con un código 500 (error interno del servidor)
      res.status(500).json({ error: err.message });
    } else {
      // Si la consulta es exitosa, respondemos con los datos de los usuarios en formato JSON
      res.json(rows);
    }
  });
});

// Ruta POST para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, correo } = req.body; // Extraemos los datos del cuerpo de la solicitud
  createUsuario(nombre, correo, (err, user) => {
    if (err) {
      // Si ocurre un error al crear el usuario, respondemos con un código 500
      res.status(500).json({ error: err.message });
    } else {
      // Si el usuario se crea con éxito, respondemos con el usuario creado y un código 201
      res.status(201).json(user);
    }
  });
});

// Ruta DELETE para eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; // Extraemos el ID del usuario de los parámetros de la URL
  deleteUsuario(id, (err) => {
    if (err) {
      // Si ocurre un error al eliminar el usuario, respondemos con un código 500
      res.status(500).json({ error: err.message });
    } else {
      // Si la eliminación es exitosa, respondemos con un código 204 (sin contenido)
      res.status(204).end();
    }
  });
});

// Ruta PUT para actualizar un usuario
app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params; // Extraemos el ID del usuario de los parámetros de la URL
  const { nombre, correo } = req.body; // Extraemos los nuevos datos del cuerpo de la solicitud
  updateUsuario(id, nombre, correo, (err) => {
    if (err) {
      // Si ocurre un error al actualizar el usuario, respondemos con un código 500
      res.status(500).json({ error: err.message });
    } else {
      // Si la actualización es exitosa, respondemos con un código 204 (sin contenido)
      res.status(204).end();
    }
  });
});

// El servidor empieza a escuchar en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`); // Mensaje de confirmación
});