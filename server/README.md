# Crumbs API

## Instructions

- React and Express (this API) are built as separate projects for now.
- Prerequisites:
  - The files *server.crt* and *private-key.pem* must be present in the root directory of this service
  - One time only: Execute `npm install` in *client* and *server* directories to install the dependencies for both projects.
- Starting the API with `npm start` will also trigger a production build of the React project. 
- The service does not immediately reflect changes from React. This service must either be restarted to trigger a new build or
by manually executing `npm run build` from the client directory.

## Usage

### User registration

#### Request
- URL: `/register`
- HTTP Method: `POST`
- Content-Type: `application/json`
- Request Body:
  ```json
  {
    "username": "exampleName",
    "password": "examplePass"
  }
  ```
#### Response
- Success
  - HTTP Method: `201 Created`
- Failure:
  - HTTP Method: `400 Bad Request`
    - Issued in cases where the password does not meet the security requirements or are missing
  - HTTP Method: `409 Conflict`
    - Issued in cases where a an account already exist with that username
  - HTTP Method: `500 Internal Server Error`
    - Issued in cases where the hashing algorithm fails
  - HTTP Method: `504 Gateway Timeout`
    - Issued in cases where the database connection fails



### User login

#### Request
- URL: `/login`
- HTTP Method: `POST`
- Content-Type: `application/json`
- Request Body:
  ```json
  {
    "username": "exampleName",
    "password": "examplePass"
  }
  ```
#### Response
- Success:
  - HTTP Method: `200 OK`
  - Content-Type: `application/json`
  - Response Body: 
    ```json
    {
      "token": "JSON_WEB_TOKEN_STRING....."
    }
    ```
- Failure:
  - HTTP Method: `400 Bad Request`
    - Issued in cases where username or password are missing
  - HTTP Method: `401 Unauthorized`
    - Issued in cases where the username and/or password does not match any existing account
  - HTTP Method: `500 Internal Server Error`
    - Issued in cases where the hashing algorithm fails
  - HTTP Method: `504 Gateway Timeout`
    - Issued in cases where the database connection fails


### Post Crumb

#### Request: 

- URL: `/posts`
- HTTP Method: `POST`
- Content-Type: `application/json`
- HTTP Header: `Authorization: bearer JSON_WEB_TOKEN_STRING.....`
- Request Body:
  ```json
  {
    "content": "example crumb text"
  }
  ```

#### Response

- Success:
  - HTTP Method: `201 Created`
    - The crumb has been accepted and successfully processed
- Failure:
  - HTTP Method: `401 Unauthorized`
    - The access token provided by the client is invalid so the user must log in