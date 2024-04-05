// Middleware de vérification du rôle d'administrateur
const isAdmin = (req, res, next) => {
  // Vérifier si l'utilisateur est authentifié
  if (!req.user) {
    // L'utilisateur n'est pas authentifié, renvoyer une réponse d'erreur 401 (non autorisé)
    return res.status(401).json({ message: 'Vous devez être authentifié pour effectuer cette action.' });
  }
  console.log(req.user.role);
  // Vérifier si l'utilisateur a un rôle d'administrateur
  if (req.user.role === "admin") {
    // L'utilisateur est un administrateur, passer à la prochaine fonction de middleware
    next();
  } else {
    // L'utilisateur n'est pas un administrateur, renvoyer une réponse d'erreur 403 (interdit)
    res.status(403).json({ message: 'Vous n êtes pas autorisé à effectuer cette action.' });
  }
};

module.exports = { isAdmin };