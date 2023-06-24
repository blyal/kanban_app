# Kanban App

This is a Kanban board application implemented using React and Express. The frontend uses React for the user interface, React-Query for server state management, and React-DnD for the drag and drop features. The backend is implemented with Express and Mongoose, with data stored in MongoDB.

The application allows users to create tasks and organize them into different sections. Users can also reorder tasks within a section or move them between different sections by using drag and drop, as well as to create and reorder sections.

## Prerequisites

To run this application, you'll need:

- [Node.js](https://nodejs.org/en/) and npm installed on your local machine
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas account

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps:

1. Clone the Repo

```shell
git clone https://github.com/blyal/Kanban_App.git
```

## Backend

1. Navigate to the backend directory

```shell
cd Kanban_App/backend
```

2. Install the backend dependencies

```shell
npm install
```

3. Create a .env file in the root of the backend directory. This file should include the following environment variables:

```shell
DATABASE_URL=<Your MongoDB connection string>
```

4. Start the backend server

```shell
npm run start
```

## Frontend

1. Navigate to the frontend directory

```shell
cd ../frontend
```

2. Install the frontend dependencies

```shell
npm install
```

3. Create a .env file in the root of the frontend directory. This file should include the following variable to connect to the local backend server:

```shell
REACT_APP_BACKEND_URL=http://localhost:5001/
```

4. Start the React development server

```shell
npm run start
```

Now, the application should be running! Navigate to `http://localhost:3000` in your web browser to see the application in action.
