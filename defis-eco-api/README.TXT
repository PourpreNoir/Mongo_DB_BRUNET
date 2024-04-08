BRUNET Clement, Vincent Stanger

API pour les Défis Environnementaux avec MongoDB

Description:
Cette application permet aux utilisateurs de s'inscrire, de se connecter et de participer à des défis environnementaux. Les utilisateurs peuvent également consulter des défis aléatoires, ajouter de nouveaux défis (réservé aux administrateurs), modifier et supprimer des défis (réservé aux administrateurs).

Fonctionnalités:

Inscription d'un nouvel utilisateur
Connexion d'un utilisateur
Récupération d'un défi aléatoire
Récupération de plusieurs défis aléatoires
Ajout d'un nouveau défi (réservé aux administrateurs)
Modification d'un défi existant (réservé aux administrateurs)
Suppression d'un défi (réservé aux administrateurs)

Utilisation:
créer une base MongoDB appelée defis_eco_db
Les routes sont accessibles via le fichier api.http. Pour les utiliser, l'extension "Rest Client" de Visual Studio Code est recommandée. Deux types d'utilisateurs peuvent être créés : "user" ou "administrator". Les utilisateurs "user" peuvent se connecter, s'inscrire et obtenir un ou plusieurs défis aléatoires. Les administrateurs peuvent créer, modifier et supprimer des défis. Pour cela, l'administrateur doit inclure le token obtenu lors de la connexion dans l'en-tête "Authorization Bearer" pour les trois routes de création, modification et suppression de défis. Par exemple :

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjA1OTM0MTM3NzIxZTg4YjRmNjAyYTQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMTgxMjEzN30.VpfcU-2_fUpmu6z_mfGxUveiUMjPVI61f6ynBwP-JvY

Enfin, pour modifier ou supprimer un défi, l'administrateur doit utiliser l'ID du défi obtenu lors de sa création et l'ajouter à la fin de l'URL correspondante.
