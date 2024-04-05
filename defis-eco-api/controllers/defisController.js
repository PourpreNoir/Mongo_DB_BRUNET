const Defi = require('../models/defi');

// Contrôleur pour récupérer un défi aléatoire
exports.getRandomDefi = async (req, res) => {
  try {
    const defi = await Defi.aggregate([{ $sample: { size: 1 } }]);
    res.json(defi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Contrôleur pour récupérer plusieurs défis aléatoires
exports.getRandomDefis = async (req, res) => {
    const count = req.params.count ;
  try {
    const defis = await Defi.aggregate([{ $sample: { size: parseInt(count) } }]);
    res.json(defis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Contrôleur pour ajouter un nouveau défi
exports.addDefi = async (req, res) => {
  // Vérifier si l'utilisateur est administrateur
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit' });
  }

  // Créer un nouveau défi
  const defi = new Defi({
    titre: req.body.titre,
    description: req.body.description,
    difficulte: req.body.difficulte
  });

  try {
    const newDefi = await defi.save();
    res.status(201).json(newDefi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Contrôleur pour modifier un défi existant
exports.updateDefi = async (req, res) => {
  // Vérifier si l'utilisateur est administrateur
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit' });
  }

  try {
    const defi = await Defi.findById(req.params.id);
    if (!defi) {
      return res.status(404).json({ message: 'Défi non trouvé' });
    }

    defi.titre = req.body.titre || defi.titre;
    defi.description = req.body.description || defi.description;
    defi.difficulte = req.body.difficulte || defi.difficulte;

    const updatedDefi = await defi.save();
    res.json(updatedDefi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Contrôleur pour supprimer un défi existant
exports.deleteDefi = async (req, res) => {
  // Vérifier si l'utilisateur est administrateur
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit' });
  }

  try {
    const defi = await Defi.findByIdAndDelete(req.params.id);
    if (!defi) {
      return res.status(404).json({ message: 'Défi non trouvé' });
    }

    res.json({ message: 'Défi supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
