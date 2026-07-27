# 📚 Smart Study Planner API

## About the Project

This is a simple REST API built using Node.js and Express.js. It helps users manage study tasks by allowing them to add, view, update, complete, and delete tasks. The project stores task data in a JSON file and demonstrates CRUD operations.

## Features

- Add a new study task
- View all study tasks
- View a task by ID
- Update a task
- Mark a task as completed
- Delete a task

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON
- Thunder Client

## Project Structure

```
Smart-Study-Planner-API
│
├── app.js
├── package.json
├── package-lock.json
├── data
│   └── tasks.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a task by ID |
| POST | /tasks | Add a new task |
| PUT | /tasks/:id | Update a task |
| PATCH | /tasks/:id/complete | Mark a task as completed |
| DELETE | /tasks/:id | Delete a task |

## How to Run

1. Clone or download the project.
2. Install the dependencies:

```bash
npm install
```

3. Start the server:

```bash
node app.js
```

4. Test the APIs using Thunder Client or Postman.

Server URL:

```
http://localhost:3000
```

## Sample Request

```json
{
  "subject": "Python",
  "topic": "Functions",
  "date": "2026-07-20",
  "priority": "High"
}
```
