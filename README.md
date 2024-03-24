# API Documentation

## Introduction
This API is used to create a queue of individuals.
This document provides details about the API endpoints available in the system.

### Base URL
All endpoints are relative to the base URL: `localhost:3001/api/v1/`

## Endpoints

### Fila

- **Description**: Collection of endpoints related to the queue.
- **Scope**: Collection

### GetUserByID

- **Description**: Retrieves user information by ID.
- **Method**: GET
- **URL**: `/user/1`
- **Headers**:
  - User-Agent: insomnia/2023.5.8

### GetUserByName

- **Description**: Retrieves user information by username.
- **Method**: GET
- **URL**: `/user/erikferreira`
- **Headers**:
  - User-Agent: insomnia/2023.5.8

### DeleteUser

- **Description**: Deletes a user by ID.
- **Method**: DELETE
- **URL**: `/user/2`
- **Headers**:
  - User-Agent: insomnia/2023.5.8

### GetAllUsers

- **Description**: Retrieves all users.
- **Method**: GET
- **URL**: `/user`
- **Parameters**:
  - username: eriklimaasd
- **Headers**:
  - User-Agent: insomnia/2023.5.8

### CreateUser

- **Description**: Creates a new user.
- **Method**: POST
- **URL**: `/user/Julia`
- **Headers**:
  - User-Agent: Insomnia/2023.5.6

## Environments

### Base Environment

- **Name**: Base Environment
- **URL**: `localhost:3001/api/v1/`

## Cookies

### Default Jar

- **Name**: Default Jar
- **Cookies**: None

## Notes
- All requests use the same base URL unless specified.
- Ensure to include appropriate headers, especially the `User-Agent` header.
- For POST requests, ensure to include a request body with relevant data.
