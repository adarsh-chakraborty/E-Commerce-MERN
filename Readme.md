# MERN Stack E-Commerce Website

Welcome to the MERN Stack E-Commerce Website project.

## Overview

This E-Commerce website is built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a platform for users to browse products, add them to their cart, and complete the purchase process. The project includes features like user authentication, product management, and a responsive user interface.

## Technologies Used

- MongoDB: Database for storing product and user information.
- Express.js: Backend framework for handling server-side logic.
- React: Frontend library for building user interfaces.
- Node.js: Runtime environment for executing JavaScript on the server.

## Project Structure

- `front-end`: React frontend application.
- `back-end`: Node.js backend server.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/mern-ecommerce.git
   ```

2. Change to the project directory:

   ```bash
   cd mern-ecommerce
   ```

3. Install dependencies for the client and server:

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

### Configuration

1. Set up MongoDB:

   - Create a MongoDB database.
   - Update the database connection string in `server/config/config.js` with your MongoDB URI.

2. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Add the following variables:

     ```env
     PORT=5000
     NODE_ENV=development
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET1=your-secret-key
     ```

     Replace `your-mongodb-uri` with your MongoDB URI and `your-secret-key` with a secret key for JWT.

### Running the Project

1. Start the server:

   ```bash
   # From the server directory
   npm start
   ```

2. Start the client:

   ```bash
   # From the client directory
   npm start
   ```

3. Open your browser and visit `http://localhost:3000` to view the application.

## Contributing

If you would like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
