// Point d'entrée Vercel Serverless
// Charge et exporte l'application Express depuis dist/app.js
module.exports = require('../dist/app.js').default;
