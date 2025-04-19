
```markdown
# TodoList Full Stack Application

A full-stack Todo list application built with the MERN stack (MongoDB, Express, React, Node.js).

## Installation

To get started, clone the repository and install the dependencies for both the frontend and backend.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Pravin-byte/TodoList.git
cd TodoList
```

### Step 2: Install Backend Dependencies

Navigate to the `server` folder and install the dependencies:

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

Navigate to the `todolist` folder and install the dependencies:

```bash
cd ../todolist
npm install
```

### Step 4: Set up Environment Variables

Create an `.env` file in the `server` folder and configure your environment variables.

Example for the `server` folder:
```
MONGODB_URI=<your_mongo_connection_uri>
PORT=3001
```

## Usage

To run both the frontend and backend locally:

### Step 1: Start the Backend

In the `server` folder, start the backend server:

```bash
cd server
npm start
```

This will run the backend on `http://localhost:3001`.

### Step 2: Start the Frontend

In the `todolist` folder, start the React development server:

```bash
cd todolist
npm start
```

This will run the frontend on `http://localhost:3000`.

## Folder Structure

Your project should have the following structure:

```
TodoList/
├── todolist/           # Your React app (frontend)
│   ├── public/
│   ├── src/
│   └── package.json
├── server/             # Your backend (Express)
│   ├── models/
│   ├── routes/
│   └── package.json
├── .gitignore
├── package.json        # (optional if you're managing both from root)
├── README.md
└── ...
```

## Technologies Used

- **Frontend:** React, JavaScript (ES6+), HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** dotenv for environment variable management
