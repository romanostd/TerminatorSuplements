# TerminatorSuplementos

An e-commerce platform for supplements, built using Angular, Node.js with Express, and MySQL.

## Tools being used:

- **Jest**: Used for unit tests and integration tests.
- **Cypress**: Used for end-to-end (E2E) tests on the frontend.
- **Prettier and ESLint**: Used to maintain code quality and standards.
- **Husky**: Runs the above technologies before committing code.
- **Docker**: Used to create images for each part of the system.
- **Bootstrap and Angular Material**: Used for easy styling.

## Setting up the environment:

To run the backend:

- First, install Node.js.

- Run the command `npm i` in the "source" directory of the project to install backend dependencies.

- Finally, to start the backend, run the command `npm run dev`. It will use nodemon to run and the nodemon.json as environment variables.

- `npm start` and `npm run test` require creation of .env file, with yours database credentials, like this: 
     `MYSQL_USER=example
      MYSQL_PASSWORD=example
      MYSQL_DATABASE=example
      MYSQL_HOST=example
      MYSQL_PORT=example
      JWT_KEY=secret`

To run the frontend:

- With Node.js installed, run the command `npm i` in the "frontend" directory of the project to install frontend dependencies.

- Run the command `npm install -g @angular/cli` in the "frontend" directory of the project to install Angular.

- Finally, to start the frontend, run the command `ng serve.`

- Possible error: 0308010C:digital envelope routines::unsupported.

- Solution: Run the following command -> set NODE_OPTIONS=--openssl-legacy-provider or switch to Node version 16 or lower.

Database:

- Docker pull mariadb

- Docker run -p 3306:3306 --name mysql-mariadb -e MYSQL_ROOT_PASSWORD=your password -d mariadb

- Install MySQL Workbench.

- Use the database model available in the repository to create tables.

Testing the application with Docker:

Frontend:

- Docker pull romanostd/terminator-front:v26

- Docker run -d -p 8080:80 romanostd/terminator-front:v26

Backend:

- Docker pull romanostd/terminator-back:v26

- Docker run -d -p 3000:3000 romanostd/terminator-back:v26

