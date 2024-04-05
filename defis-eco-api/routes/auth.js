const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Route pour le register
router.post('/register', async (req, res) => {
  // Vérifier si l'utilisateur existe déjà dans la base de données
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: 'Cet email est déjà utilisé' });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Créer un nouvel utilisateur
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role : req.body.role
  });

  try {
    // Enregistrer l'utilisateur dans la base de données
    const savedUser = await newUser.save();

    // Créer et envoyer le token JWT
    const token = jwt.sign({ _id: savedUser._id }, '3e815a641277f155b1a24f3fd1ccd2ceccdbe68999b805cbd3627d005ce8733d');
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour le login
router.post('/login', async (req, res) => {
  // Vérifier si l'utilisateur existe dans la base de données
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
  }

  // Vérifier si le mot de passe est correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
  }

  // Créer et envoyer le token JWT
  const token = jwt.sign({ _id: user._id, role: user.role }, '3e815a641277f155b1a24f3fd1ccd2ceccdbe68999b805cbd3627d005ce8733d');
  res.json({ token });
});

module.exports = router;
