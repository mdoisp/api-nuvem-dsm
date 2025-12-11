# api-nuvem-dsm

API Nuvem DSM - Branch Management API

## Description

A RESTful API for managing branches (filiais) in a cloud-based system. This API provides CRUD (Create, Read, Update, Delete) operations for branch management.

## Installation

```bash
npm install
```

## Running the API

```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### Get all branches
- **URL**: `/api/branches`
- **Method**: `GET`
- **Success Response**: 
  - Code: 200
  - Content: Array of branch objects

### Get a single branch
- **URL**: `/api/branches/:id`
- **Method**: `GET`
- **Success Response**: 
  - Code: 200
  - Content: Branch object
- **Error Response**:
  - Code: 404
  - Content: `{ error: "Branch not found" }`

### Create a new branch
- **URL**: `/api/branches`
- **Method**: `POST`
- **Data Params**: 
  ```json
  {
    "name": "Branch Name",
    "location": "Branch Location",
    "manager": "Manager Name (optional)"
  }
  ```
- **Success Response**: 
  - Code: 201
  - Content: Created branch object
- **Error Response**:
  - Code: 400
  - Content: `{ error: "Name and location are required" }`

### Update a branch
- **URL**: `/api/branches/:id`
- **Method**: `PUT`
- **Data Params**: 
  ```json
  {
    "name": "Updated Name (optional)",
    "location": "Updated Location (optional)",
    "manager": "Updated Manager (optional)"
  }
  ```
- **Success Response**: 
  - Code: 200
  - Content: Updated branch object
- **Error Response**:
  - Code: 404
  - Content: `{ error: "Branch not found" }`

### Delete a branch
- **URL**: `/api/branches/:id`
- **Method**: `DELETE`
- **Success Response**: 
  - Code: 204
  - Content: None
- **Error Response**:
  - Code: 404
  - Content: `{ error: "Branch not found" }`

## Example Usage

```bash
# Get all branches
curl http://localhost:3000/api/branches

# Get a specific branch
curl http://localhost:3000/api/branches/1

# Create a new branch
curl -X POST http://localhost:3000/api/branches \
  -H "Content-Type: application/json" \
  -d '{"name":"South Branch","location":"Porto Alegre","manager":"Carlos Lima"}'

# Update a branch
curl -X PUT http://localhost:3000/api/branches/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Branch Name"}'

# Delete a branch
curl -X DELETE http://localhost:3000/api/branches/1
```