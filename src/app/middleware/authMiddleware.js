const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // El token debería venir en los encabezados de la solicitud
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401); // No autorizado si no hay token

  jwt.verify(token, 'marlon2004', (err, user) => {
    if (err) return res.sendStatus(403); // Prohibido si el token no es válido

    req.user = user; // Guardamos la información del usuario extraída del token en el objeto req
    next(); // Continuamos hacia el siguiente middleware o la ruta solicitada
  });
}
module.exports = authenticateToken;

