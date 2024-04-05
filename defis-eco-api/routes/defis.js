const express = require('express');
const router = express.Router();
const defisController = require('../controllers/defisController');
const {isAdmin} = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/auth');

// Route pour récupérer un défi aléatoire
router.get('/random', defisController.getRandomDefi);

// Route pour récupérer plusieurs défis aléatoires
router.get('/random/:count', defisController.getRandomDefis);

// Route pour ajouter un nouveau défi
router.post('/', verifyToken ,isAdmin, defisController.addDefi);

// Route pour mettre à jour un défi existant
router.put('/:id', verifyToken,isAdmin, defisController.updateDefi);

// Route pour supprimer un défi existant
router.delete('/:id',verifyToken, isAdmin, defisController.deleteDefi);

module.exports = router;
