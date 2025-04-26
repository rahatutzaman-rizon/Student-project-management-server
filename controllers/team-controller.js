// controllers/team-controller.js - Team controller
const TeamModel = require('../models/team');

class TeamController {
  constructor(teamNumber) {
    this.teamModel = new TeamModel(teamNumber);
    this.teamNumber = teamNumber;
  }

  // Get all teams
  getAll = async (req, res) => {
    try {
      const teams = await this.teamModel.getAll();
      res.send(teams);
    } catch (error) {
      console.error(`Error in getAll for team ${this.teamNumber}:`, error);
      res.status(500).send('Internal server error');
    }
  };

  // Get team by ID
  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const team = await this.teamModel.getById(id);
      
      if (!team) {
        return res.status(404).send('Team not found');
      }
      
      res.send(team);
    } catch (error) {
      console.error(`Error in getById for team ${this.teamNumber}:`, error);
      res.status(500).send('Internal server error');
    }
  };

  // Add task to team
  addTask = async (req, res) => {
    try {
      const id = req.params.id;
      const task = req.body;
      
      const result = await this.teamModel.addTask(id, task);
      res.send(result);
    } catch (error) {
      console.error(`Error in addTask for team ${this.teamNumber}:`, error);
      res.status(500).send('Internal server error');
    }
  };

  // Delete task from team
  deleteTask = async (req, res) => {
    try {
      const { id, taskNumber } = req.params;
      
      const result = await this.teamModel.deleteTask(id, taskNumber);
      
      if (result.modifiedCount > 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send('Task not found');
      }
    } catch (error) {
      console.error(`Error in deleteTask for team ${this.teamNumber}:`, error);
      res.status(500).send('Internal server error');
    }
  };

  // Update task status
  updateTaskStatus = async (req, res) => {
    try {
      const { id, taskNumber } = req.params;
      const { status } = req.body;
      
      const result = await this.teamModel.updateTaskStatus(id, taskNumber, status);
      
      if (result.modifiedCount > 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send('Task not found');
      }
    } catch (error) {
      console.error(`Error in updateTaskStatus for team ${this.teamNumber}:`, error);
      res.status(500).send('Internal server error');
    }
  };
}

module.exports = TeamController;