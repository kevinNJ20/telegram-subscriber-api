// Point d'entrée pour Vercel Serverless
// Ce fichier exporte l'application Express pour Vercel

const path = require('path');

// En production sur Vercel, les fichiers compilés sont dans dist/
const app = require(path.join(__dirname, '../dist/app.js')).default || require(path.join(__dirname, '../dist/app.js'));

module.exports = app;

