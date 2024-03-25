# API Documentation

## Installation and Execution Steps for Local Environment:

1. Install dependencies:
```bash

  npm install

```

2. Up Docker
```bash

  docker compose up -d

```

3. Build migrations:
```bash

  nxp prisma init && npx prisma generate && npx prisma migrate dev

```

4. Build project:
```bash

  npm run build

```

5. Start the server:
```bash

  npm start

```

## Introduction
This API is used to create a queue of individuals.
This document provides details about the API endpoints available in the system.

### Base URL for the local execution
All endpoints are relative to the base URL: `localhost:3001/api/v1/`

### Base URL for execution in your project
...soon

## Endpoints

### Fila

- **Description**: Collection of endpoints related to the queue.
- **Scope**: Collection

### GetUserByID

- **Description**: Retrieves user information by ID.
- **Method**: GET
- **URL**: `/user/1`

### GetUserByName

- **Description**: Retrieves user information by username.
- **Method**: GET
- **URL**: `/user/erikferreira`

### DeleteUser

- **Description**: Deletes a user by ID.
- **Method**: DELETE
- **URL**: `/user/2`

### GetAllUsers

- **Description**: Retrieves all users.
- **Method**: GET
- **URL**: `/user`
- **Parameters**:
  - username: Jason

### CreateUser

- **Description**: Creates a new user.
- **Method**: POST
- **URL**: `/user/Jason`

## Environments

### Base Environment

- **Name**: Base Environment
- **URL**: `localhost:3001/api/v1/`

## Notes
- All requests use the same base URL unless specified.
