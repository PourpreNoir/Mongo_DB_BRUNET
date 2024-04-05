const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const defis = require('./routes/defis');


const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Monter les routes d'authentification
app.use('/api', authRoutes);
app.use('/api/defis', defis);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/defis_eco_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB :', err.message);
});

// Port d'écoute du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
