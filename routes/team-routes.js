// routes/team-routes.js - Team routes
const express = require('express');
const TeamController = require('../controllers/team-controller');

// Create router for each team
const createTeamRouter = (teamNumber) => {
  const router = express.Router();
  const controller = new TeamController(teamNumber);

  // Routes
  router.get(`/${teamNumber}`, controller.getAll);
  router.get(`/team${teamNumber}/:id`, controller.getById);
  router.put(`/add-task/team${teamNumber}/:id`, controller.addTask);
  router.delete(`/delete-task/team${teamNumber}/:id/:taskNumber`, controller.deleteTask);
  router.put(`/update-task-status/team${teamNumber}/:id/:taskNumber`, controller.updateTaskStatus);

  return router;
};

module.exports = { createTeamRouter };