# Task Management System

A project management system designed for teachers to assign and track tasks for student project teams.

## Features

- Team project management
- Task assignment and tracking
- Email notifications for task updates
- Excel file upload and processing
- Task status updates and tracking

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file with your MongoDB connection string and email credentials.

## Usage

### Development

Run the development server with hot reloading:

```
npm run dev
```

### Production

Start the production server:

```
npm start
```

## API Documentation

### Projects

- `GET /api/projects/team/:teamId` - Get all projects for a specific team
- `GET /api/projects/:id` - Get project details by ID
- `POST /api/projects/upload` - Upload Excel file with project data

### Tasks

- `PUT /api/tasks/add/:teamId/:projectId` - Add a task to a project
- `DELETE /api/tasks/:teamId/:projectId/:taskNumber` - Delete a task
- `PUT /api/tasks/status/:teamId/:projectId/:taskNumber` - Update task status

## Database Structure

The application uses MongoDB with the following collections:

- `team1` through `team7` - Collections for each team's projects
- `exceldata` - Collection for uploaded Excel data

## License

MIT