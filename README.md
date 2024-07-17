# Task ToggleHead

## Project Overview

Task ToggleHead is a Node.js and MongoDB-based project built with TypeScript. This project allows users to manage tasks with the capability to toggle their status.

## Installation and Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Getting Started

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd task-togglehead
    ```

2. **Install dependencies**

    Use npm to install all required packages:

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory of your project and add your MongoDB connection URL:

    ```plaintext
    MONGO_URL=<your-mongodb-url>
    ```

4. **Initialize Demo Data**

    To preload the database with demo data for banners and FAQs, run the following command:

    ```bash
    npm run init
    ```

5. **Run the Backend**

    Use the following command to start the development server:

    ```bash
    npm run dev
    ```

    The backend will be up and running on port `4500`.

6. **Run the Frontend**

    Navigate to the frontend directory and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

## Frontend Routes

### Admin Routes

1. **Login**

    Use the following credentials to login as an admin:

    ```json
    {
        "email": "superadmin@gmail.com",
        "password": "12345678"
    }
    ```

    After logging in, you will be redirected to the banners upload page.

2. **Banners Upload**

    Route: `/admin/banner`
   
## API Documentation

You can use the following Postman collection to test the APIs:

[Postman Collection Link](#)

## Available Scripts

- **`npm run dev`**: Starts the development server on port 4500.
- **`npm run build`**: Compiles the TypeScript files.
- **`npm start`**: Runs the compiled JavaScript files.
- **`npm run init`**: Loads the database with demo data for banners and FAQs.

## Project Structure

```plaintext
task-togglehead/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
