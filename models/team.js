// models/team.js - Team model
const { collections, ObjectId } = require('../config/db');
const { sendTaskNotification } = require('../config/email');

class TeamModel {
  constructor(teamNumber) {
    this.teamNumber = teamNumber;
    this.collection = collections[`teacherCollection${teamNumber}`];
  }

  // Get all teams
  async getAll() {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error(`Error getting team ${this.teamNumber} data:`, error);
      throw error;
    }
  }

  // Get team by ID
  async getById(id) {
    try {
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error(`Error getting team ${this.teamNumber} by ID:`, error);
      throw error;
    }
  }

  // Add task to team
  async addTask(id, task) {
    try {
      // Add task to database
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { tasks: task } }
      );
      
      // Get project details for email
      const project = await this.getById(id);
      
      // Send email notification
      await sendTaskNotification(project, task);
      
      return result;
    } catch (error) {
      console.error(`Error adding task to team ${this.teamNumber}:`, error);
      throw error;
    }
  }

  // Delete task from team
  async deleteTask(id, taskNumber) {
    try {
      return await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $pull: { tasks: { number: parseInt(taskNumber) } } }
      );
    } catch (error) {
      console.error(`Error deleting task from team ${this.teamNumber}:`, error);
      throw error;
    }
  }

  // Update task status
  async updateTaskStatus(id, taskNumber, status) {
    try {
      return await this.collection.updateOne(
        { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
        { $set: { "tasks.$.status": status } }
      );
    } catch (error) {
      console.error(`Error updating task status for team ${this.teamNumber}:`, error);
      throw error;
    }
  }
}

module.exports = TeamModel;