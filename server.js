const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); //Esta es para el cifrado de contraseñas

const app = express();
const port = 3000;



// Configuraciones del CORS
app.use(cors());
// Configuraciones del Body Parser
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ariel2004',
  database: 'formdata'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});


// Endpoint para manejar los datos enviados desde el frontend "Registro"
app.post('/register', (req, res) => {
  const { name, lastname, email, password, phonenumber } = req.body;

  // salt y cifrado de la contraseña
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error('Error generando el salt:', err);
      res.status(500).json({ error: 'Error generando el salt' });
      return;
    }

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error('Error cifrando la contraseña:', err);
        res.status(500).json({ error: 'Error cifrando la contraseña' });
        return;
      }

      const query = 'INSERT INTO registerform (name, lastname, email, password, phonenumber) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [name, lastname, email, hashedPassword, phonenumber], (err, result) => {
        if (err) {
          console.error('Error al insertar datos:', err);
          res.status(500).json({ error: 'Error en la inserción de datos' });
          return;
        }

        // Respuesta con mensaje estructurado y mensaje de texto
        console.log('Datos insertados correctamente:', result); //Este es para poder verlo aquí en el VSCode
        res.status(200).json({ message: 'Datos insertados y guardados', result }); //Este para la consola
        // o
        // res.send('Datos insertados y guardados'); sisrve si es que solo se van a enviar texto palno, en este caso el de  .json es el recomendable
      });
    });
  });
});

// Endpoint para el "login" si es que el usaurio se ha registrado previamente
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT password FROM registerform WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      res.status(500).json({ error: 'Error al buscar usuario' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Usuario no encontrado. Regístrese antes de iniciar sesión' });
      return;
    }

    const hashedPassword = results[0].password;

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        res.status(500).json({ error: 'Error al comparar contraseñas' });
        return;
      }

      // console.log('¿Las contraseñas coinciden?', isMatch);

      if (isMatch) {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    });
  });
});

// Endpoint para eliminar la cuenta del usuario
app.delete('/delete-account', (req, res) => {
  const email = req.query.email; // Obtener el email de la consulta

  const query = 'DELETE FROM registerform WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error al eliminar la cuenta:', err);
      res.status(500).json({ error: 'Error al eliminar la cuenta' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Cuenta no encontrada' });
      return;
    }

    res.status(200).json({ message: 'Cuenta eliminada correctamente' });
  });
});




// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Node.js!');
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});

/*Endpoint para manejar los datos enviados desde el frontend, hay que revisar el archivo data.service.ts
app.post('/endpoint', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error al insertar datos: ', err);
      res.status(500).json({ error: 'Error en la inserción de datos' });
      return;
    }

    // Respuesta con mensaje estructurado y mensaje de texto
    console.log('Datos insertados correctamente:', result); //Este es para poder verlo aquí en el VSCode
    res.status(200).json({ message: 'Datos insertados y guardados', result }); //Este para la consola
    // o
    // res.send('Datos insertados y guardados'); sisrve si es que solo se van a enviar texto palno, en este caso el de  .json es el recomendable
  });
});*/
