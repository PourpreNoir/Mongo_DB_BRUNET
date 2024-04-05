const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const autheaef = req.header('Authorization');
  
  if (!autheaef) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }
  const token = autheaef && autheaef.split(' ')[1];
  try {
    const decoded = jwt.verify(token, '3e815a641277f155b1a24f3fd1ccd2ceccdbe68999b805cbd3627d005ce8733d');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
}

module.exports = verifyToken;
