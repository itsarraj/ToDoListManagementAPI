# To-Do List Management API Documentation

## Overview

This API provides endpoints for managing a to-do list, including functionalities for adding, editing, deleting tasks, marking tasks as completed, and retrieving tasks. It is built using NestJS and MongoDB with Mongoose for data storage.

## Code Structure

### Source Directory (`src`)
- __`app.controller.ts`__: Controller for handling incoming requests to the root endpoint.
- __`app.controller.spec.ts`__: Unit tests for `app.controller.ts`.
- __`app.module.ts`__: Main module for the application, imports other modules.
- __`app.service.ts`__: Provides services to the controller.
- __`main.ts`__: Entry point of the application.
- __`tasks/`__: Directory containing task-related modules, controllers, and services.
  - __`task.model.ts`__: Mongoose schema and interface for the Task model.
  - __`tasks.controller.ts`__: Controller for handling task-related requests.
  - __`tasks.service.ts`__: Provides task-related business logic.

### Test Directory (`test`)
- __`app.controller.e2e-spec.ts`__: End-to-end tests for the `AppController`.
- __`tasks.controller.e2e-spec.ts`__: End-to-end tests for the `TasksController`.
- __`jest-e2e.json`__: Configuration for end-to-end testing with Jest.

## Key Decisions

1. __NestJS Framework__: Chosen for its modular architecture, built-in dependency injection, and powerful CLI.
2. __Mongoose__: Used for MongoDB object modeling, providing schema-based solutions for application data.
3. __Modular Structure__: Organized code into modules (e.g., `tasks` module) to enhance maintainability and scalability.
4. __Testing__: Included both unit and end-to-end tests to ensure code quality and reliability.
5. __Environment Variables__: Used environment variables to store sensitive information such as MongoDB connection strings.

## API Endpoints

### Task Endpoints

#### Get All Tasks
- __URL__: `/tasks`
- __Method__: GET
- __Description__: Retrieves all tasks from the database.
- __Response__: Array of Task objects.

#### Create a Task
- __URL__: `/tasks`
- __Method__: POST
- __Description__: Creates a new task.
- __Request Body__:
  ```json
  {
    "title": "Task Title",
    "planning": "Task Planning",
    "done": false
  }
  ```
- __Response__: The created Task object.

#### Update a Task
- __URL__: `/tasks/:id`
- __Method__: PUT
- __Description__: Updates an existing task by ID.
- __Request Body__:
  ```json
  {
    "title": "Updated Task Title",
    "planning": "Updated Task Planning",
    "done": false
  }
  ```
- __Response__: The updated Task object.

#### Delete a Task
- __URL__: `/tasks/:id`
- __Method__: DELETE
- __Description__: Deletes a task by ID.
- __Response__: The deleted Task object.

#### Mark a Task as Done
- __URL__: `/tasks/:id/done`
- __Method__: PATCH
- __Description__: Marks a task as completed by ID.
- __Response__: The updated Task object with `done` set to `true`.

## Running the Application

### Prerequisites
- Node.js and npm
- MongoDB instance

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/itsarraj/todo-api-nestjs.git
   ```
2. Install dependencies:
   ```bash
   cd todo-api-nestjs
   npm install
   ```

### Running the Application
1. Start the NestJS application:
   ```bash
   npm run start
   ```
2. The application will be running at `http://localhost:3000`.

### Running Tests
- Unit tests:
  ```bash
  npm run test
  ```
- End-to-end tests:
  ```bash
  npm run test:e2e
  ```

This documentation provides an overview of the code structure, key decisions, and API endpoints for the To-Do List Management API built with NestJS. For further details, refer to the code comments and the respective modules.