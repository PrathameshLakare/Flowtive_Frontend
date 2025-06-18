# Flowtive

A modern full-stack collaboration and productivity platform for teams and individuals.  
Manage tasks, projects, teams, and tags; track progress, generate reports, and streamline your workflow—all in one place.

---

## 🚀 Live Demo

[Try Flowtive Now](https://workasana-frontend.vercel.app)

---

## 🛂 Guest Login

- **Username:** `useremail`
- **Password:** `userpassword`

---

## ⚡ Quick Start

```sh
git clone https://github.com/PrathameshLakare/Flowtive_Frontend.git
cd FlowtiveFrontend
npm install
npm start
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Bootstrap
- **Backend:** Node.js, Express, MongoDB, JWT

---

## 🎥 Demo Video

Watch a walkthrough of Flowtive’s features:  
[Loom Video Link](https://www.youtube.com/watch?v=z7BOao-Qq2Y)

---

## ✨ Features

- **Authentication:** Secure signup/login with JWT, protected routes, and user profile management.
- **User Management:** View all users, manage your profile, and collaborate with team members.
- **Teams:** Create and manage teams, assign users, and organize work by teams.
- **Projects:** Create and manage projects, assign them to teams, and track project progress.
- **Tags:** Create and assign tags to tasks for better organization and filtering.
- **Tasks:**
  - Create, edit, update, and delete tasks.
  - Assign tasks to projects, teams, and multiple owners.
  - Add tags, set status (To Do, Completed, etc.), and estimate time to complete.
  - Filter tasks by tags, status, owners, project, or team.
- **Reports:**
  - View tasks completed in the last week.
  - Get total pending work in days.
  - Analyze closed tasks grouped by team, owners, or project.

---

## API Reference

### **Authentication**

#### **POST /auth/signup**

Register a new user  
**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### **POST /auth/login**

Login user  
**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User login successful.",
  "token": "jwt_token_here"
}
```

---

#### **GET /auth/me**

Get current user profile (requires JWT in `Authorization` header)  
**Response:**

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### **Users**

#### **GET /users**

List all users (requires JWT)  
**Response:**

```json
{
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

---

### **Teams**

#### **POST /teams**

Create a new team  
**Request Body:**

```json
{
  "name": "Frontend Team",
  "description": "Handles UI/UX"
}
```

**Response:**

```json
{
  "message": "Team created successfully",
  "team": {}
}
```

#### **GET /teams**

List all teams  
**Response:**

```json
{
  "teams": [
    {
      "_id": "team_id",
      "name": "Frontend Team",
      "description": "Handles UI/UX"
    }
  ]
}
```

---

### **Projects**

#### **POST /projects**

Create a new project  
**Request Body:**

```json
{
  "name": "Website Redesign",
  "description": "Revamp the company website"
}
```

**Response:**

```json
{
  "message": "Project created successfully.",
  "project": {}
}
```

#### **GET /projects**

List all projects  
**Response:**

```json
{
  "message": "Projects fetched successfully.",
  "projects": []
}
```

---

### **Tags**

#### **POST /tags**

Create a new tag  
**Request Body:**

```json
{
  "name": "Urgent"
}
```

**Response:**

```json
{
  "message": "Tag created successfully.",
  "tag": {}
}
```

#### **GET /tags**

List all tags  
**Response:**

```json
{
  "message": "Tags fetched successfully.",
  "tags": []
}
```

---

### **Tasks**

#### **POST /tasks**

Create a new task  
**Request Body:**

```json
{
  "name": "Design Homepage",
  "project": "project_id",
  "team": "team_id",
  "owners": ["user_id1", "user_id2"],
  "tags": ["UI", "Urgent"],
  "status": "To Do",
  "timeToComplete": 3
}
```

**Response:**

```json
{
  "message": "Task created successfully",
  "task": {}
}
```

#### **GET /tasks**

List tasks (supports filtering by tags, status, owners, project, team)  
**Response:**

```json
[
  {
    "_id": "task_id",
    "name": "Design Homepage",
    "status": "To Do",
    "dueDate": "2025-06-14T12:00:00.000Z"
  }
]
```

#### **POST /tasks/:id**

Update a task  
**Request Body:** (fields to update)

```json
{
  "status": "Completed"
}
```

**Response:**

```json
{
  "message": "Task updated successfully",
  "task": {}
}
```

#### **DELETE /tasks/:id**

Delete a task  
**Response:**

```json
{
  "message": "Task deleted successfully",
  "task": {}
}
```

---

### **Reports**

#### **GET /report/last-week**

Get tasks completed in the last week  
**Response:**

```json
{
  "message": "Tasks completed in the last week.",
  "data": []
}
```

#### **GET /report/pending**

Get total pending work in days  
**Response:**

```json
{
  "message": "Total pending work in days.",
  "data": { "totalPendingDays": 5 }
}
```

#### **GET /report/closed-tasks?groupBy=team|owners|project**

Get closed tasks grouped by team, owners, or project  
**Response:**

```json
{
  "message": "Tasks closed by each team.",
  "data": []
}
```

---

## 📬 Contact

For bugs, suggestions, or feature requests, email:  
**prathameshlakare001@gmail.com**
