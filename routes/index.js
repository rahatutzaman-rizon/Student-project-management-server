// routes/index.js - Route setup
const { createTeamRouter } = require('./team-routes');
const excelRoutes = require('./excel-routes');

// Setup all routes
const setupRoutes = (app) => {
  // Team routes (1-7)
  for (let i = 1; i <= 7; i++) {
    app.use('/', createTeamRouter(i));
  }
  
  // Excel routes
  app.use('/', excelRoutes);
};

module.exports = { setupRoutes };