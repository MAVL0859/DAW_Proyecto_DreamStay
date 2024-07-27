const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("./middleware/authMiddleware");




/**
 * Express application instance.
 * @type {import('express').Express}
 */
const app = express();
const port = 3000;

// Configuraciones del CORS
app.use(cors(
  origin = 'http://localhost:4200', // o la URL de tu aplicación Angular
  methods = ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders = ['Content-Type', 'Authorization']
));
// Configuraciones del Body Parser
app.use(bodyParser.json());

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Sirve la carpeta 'uploads' como archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar la conexión a la base de datos MySQL
/**
 * The database connection object.
 *
 * @type {mysql.Connection}
 */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ariel2004",
  database: "formdata",
});

// Configuraciones
app.use(express.json());
app.use('/uploads', express.static('uploads'));

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL.");
});


/*
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se subió ningún archivo.");
  }
  const imagePath = req.file.path;
  res.send({ imagePath });
});*/

// Endpoint para agregar un hotel
app.post("/hotels", upload.single("image"), (req, res) => {
  const { name, description, location, services } = req.body;
  const imagePath = req.file ? req.file.path : null;

  if (!imagePath) {
    return res.status(400).send("No se subió ninguna imagen.");
  }

  const query = "INSERT INTO hotels (name, description, imagePath, location, services) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, description, imagePath, location, services], (error, results) => {
    if (error) {
      return res.status(500).send("Error al agregar el hotel.");
    }
    res.send("Hotel agregado correctamente.");
  });
});

// Ruta para actualizar un hotel
app.put('/hotels/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, location, services } = req.body;
  let imagePath = req.file ? req.file.path : null;

  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  let sql = 'UPDATE hotels SET name = ?, description = ?, location = ?, services = ?';
  let values = [name, description, location, services];

  if (imagePath) {
    sql += ', imagePath = ?';
    values.push(imagePath);
  }

  sql += ' WHERE id = ?';
  values.push(id);

  console.log("SQL Query:", sql);
  console.log("Values:", values);

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error al actualizar el hotel:", error);
      return res.status(500).send("Error al actualizar el hotel.");
    }
    res.send("Hotel actualizado correctamente.");
  });
});

// Ruta para eliminar un hotel
app.delete('/hotels/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM hotels WHERE id = ?';
  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Error al eliminar el hotel:", error);
      return res.status(500).send("Error al eliminar el hotel.");
    }
    res.send("Hotel eliminado correctamente.");
  });
});

// Ruta para obtener todos los hoteles
app.get('/hotels', (req, res) => {
  const query = 'SELECT * FROM hotels';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los hoteles:', error);
      return res.status(500).send('Error al obtener los hoteles.');
    }
    res.send(results);
  });
});


// Ruta para obtener un hotel por ID
app.get('/hotels/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM hotels WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error al obtener el hotel:", error);
      return res.status(500).send("Error al obtener el hotel.");
    }
    if (results.length === 0) {
      return res.status(404).send("Hotel no encontrado.");
    }
    const hotel = results[0];
    if (hotel.imagePath) {
      hotel.imagePath = `http://localhost:3000/${hotel.imagePath}`;
    }
    res.send(hotel);
  });
});

//Fin configuracion de las API en admin

//Reservaciones
// Endpoint para crear una reserva
app.post('/reservations', authenticateToken, (req, res) => {
  const { userId, hotelId, checkInDate, checkOutDate, roomType, numGuests } = req.body;
  console.log('Datos recibidos:', { userId, hotelId, checkInDate, checkOutDate, roomType, numGuests });

  const query = 'INSERT INTO reservations (userId, hotelId, checkInDate, checkOutDate, roomType, numGuests) VALUES (?, ?, ?, ?, ?, ?)';
  console.log('Consulta SQL:', query);

  db.query(query, [userId, hotelId, checkInDate, checkOutDate, roomType, numGuests], (err, result) => {
    if (err) {
      console.error('Error al crear la reserva:', err);
      return res.sendStatus(500);
    }
    console.log('Resultado de la inserción:', result);
    res.status(201).json({ message: 'Reserva creada', reservationId: result.insertId });
  });
});


// Endpoint para obtener todas las reservas de un usuario
app.get("/reservations", authenticateToken, (req, res) => {
  const user = req.user;

  const query = "SELECT * FROM reservations WHERE userId = ?";
  db.query(query, [user.id], (error, results) => {
    if (error) {
      console.error("Error al obtener las reservas:", error);
      return res.status(500).send("Error al obtener las reservas.");
    }
    res.send(results);
  });
});

//Fin de reservaciones

// Endpoint para manejar los datos enviados desde el frontend "Registro"
app.post("/register", (req, res) => {
  const { name, lastname, email, password, phonenumber } = req.body;

  // Primero, verificamos si el correo electrónico ya existe en la base de datos
  const checkEmailQuery = "SELECT * FROM registerform WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error al verificar el correo electrónico:", err);
      res
        .status(500)
        .json({ error: "Error en la verificación del correo electrónico" });
      return;
    }

    if (results.length > 0) {
      // Si el correo electrónico ya existe, envía una respuesta de error
      res.status(400).json({ error: "Correo electrónico yá registrado" });
      return;
    }

    // Si el correo electrónico no existe, continúa con el registro
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error("Error generando el salt:", err);
        res.status(500).json({ error: "Error generando el salt" });
        return;
      }

      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          console.error("Error cifrando la contraseña:", err);
          res.status(500).json({ error: "Error cifrando la contraseña" });
          return;
        }

        const insertQuery =
          "INSERT INTO registerform (name, lastname, email, password, phonenumber) VALUES (?, ?, ?, ?, ?)";
        db.query(
          insertQuery,
          [name, lastname, email, hashedPassword, phonenumber],
          (err, result) => {
            if (err) {
              console.error("Error al insertar datos:", err);
              res.status(500).json({ error: "Error en la inserción de datos" });
              return;
            }

            // Respuesta con mensaje estructurado y mensaje de texto
            console.log("La cuenta ha sido creada correctamente", result);
            res
              .status(200)
              .json({
                message: "La cuenta ha sido creada correctamente",
                result,
              });
          }
        );
      });
    });
  });
});

// Endpoint para el "login" si es que el usuario se ha registrado previamente
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT name, password FROM registerform WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      res.status(500).json({ error: "Error al buscar usuario" });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: "¡Ups! Cuenta no registrada. ¡Crea una cuenta ahora!" });
      return;
    }

    const user = results[0];
    const hashedPassword = user.password;

    bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        res.status(500).json({ error: "Error al comparar contraseñas" });
        return;
      }

      if (isMatch) {
        // Generamos un token JWT para cada usuario, incluyendo el nombre en la carga útil
        const token = jwt.sign({ email, name: user.name }, "marlon2004", { expiresIn: "1h" });

        // Configuración del correo electrónico de bienvenida
        const mailOptions = {
          from: 'stayd083@gmail.com',
          to: email,
          subject: 'Inicio de sesión exitoso',
          text: `Hola ${user.name},\n\nHas iniciado sesión exitosamente en DreamStay.\n\nSaludos`,
        };

        try {
          const result = await sendMail(mailOptions);
          console.log('Correo electrónico enviado:', result.response);
        } catch (error) {
          console.error('Error al enviar el correo electrónico:', error);
        }

        // Respuesta con el token JWT
        res.status(200).json({ message: "Iniciando sesión", token });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
      }
    });
  });
});


// Endpoint protegido para eliminar la cuenta del usuario
app.delete("/delete-account", authenticateToken, (req, res) => {
  const email = req.user.email; // El correo electrónico viene del token decodificado

  const query = "DELETE FROM registerform WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error al eliminar la cuenta:", err);
      res.status(500).json({ error: "Error al eliminar la cuenta" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Cuenta no encontrada" });
      return;
    }

    res.status(200).json({ message: "Cuenta eliminada correctamente" });
  });
});

// Endpoint protegido para obtener datos del usuario
app.get("/user-details", authenticateToken, (req, res) => {
  const email = req.user.email; // El correo electrónico viene del token decodificado

  const query =
    "SELECT name, lastname, email, phonenumber FROM registerform WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error al obtener los datos del usuario:", err);
      res.status(500).json({ error: "Error al obtener los datos del usuario" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(results[0]);
  });
});

// Endpoint para actualizar los datos del usuario
app.put("/update-user", (req, res) => {
  const { name, lastname, email, phonenumber } = req.body;

  const query =
    "UPDATE registerform SET name = ?, lastname = ?, phonenumber = ? WHERE email = ?";
  db.query(query, [name, lastname, phonenumber, email], (err, result) => {
    if (err) {
      console.error("Error al actualizar los datos del usuario:", err);
      res
        .status(500)
        .json({ error: "Error al actualizar los datos del usuario" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res
      .status(200)
      .json({ message: "Datos del usuario actualizados correctamente" });
  });
});



// Endpoint para cerrar sesión
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Sesión cerrada correctamente" });
});

// Ruta para la página principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor Node.js!");
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});
