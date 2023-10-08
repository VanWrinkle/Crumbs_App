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
- URL: `/api/register`
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
- URL: `/api/login`
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

- URL: `/api/postCrumb`
- HTTP Method: `POST`
- Content-Type: `application/json`
- Request Body:
  ```json
  {
    "parent": "optional_parent_id",
    "userId": "test_user",
    "content": "This is a crumb text",
    "published": "2023-09-29T15:56:49.419Z",
    "expires": "2023-10-13T15:56:49.419Z",
    "likes": 0,
    "comments": []
  }
  ```

#### Response

- Success:
  - HTTP Method: `201 Created`
    - The crumb has been accepted and successfully processed
- Failure:
  - HTTP Method: `401 Unauthorized`
    - The access token provided by the client is invalid so the user must log in




## WIP

### Get UserPosts 

#### Request

- URL: `/api/getUserPosts?sort=[time:engagement]&order=[asc:desc]`
- HTTP Method: `GET`
- Content-Type: `application/json`
- Request Body:
```json
{
  "author_username": "author_of_posts",
  "max_posts": 3,
  "continue_from": "35901*+24+w5ssfsdf+%%¤)"
}
```

### Get Replies

#### Request

- URL: `/api/getReplies?sort=[time:engagement]&order=[asc:desc]`
- HTTP Method: `GET`
- Content-Type: `application/json`
- Request Body:
```json
{
  "parent": "5=%jf0f+24jajsf9u234n02",
  "max_posts": 15,
  "continue_from": "35901*+24+w5ssfsdf+%%¤)"
}
```

### Get HashtagPosts

#### Request

- URL: `/api/getPostsByHashtags?sort=[time:engagement]&order=[asc:desc]`
- HTTP Method: `GET`
- Content-Type: `application/json`
- Request Body:
```json
{
  "hashtags": [
    "hashtag1",
    "hashtag2"
  ],
  "max_posts": 15,
  "continue_from": "35901*+24+w5ssfsdf+%%¤)"
}
```

### Get Main Feed

#### Request

- URL: `/api/getPersonalFeed`
- HTTP Method: `GET`
- Content-Type: `application/json`
- Request Body:
```json
{
  "max_posts": 7,
  "continue_from": "35901*+24+w5ssfsdf+%%¤)"
}
```

#### Response


```json
[
  {
    "author": "author_of_post",
    "date": "Date string",
    "post_id": "35901*+24+w5ssfsdf+%%¤)",
    "likes": 132,
    "liked": false,
    "post_content": [
      {
        "type": "[hashtag:mention:text:url:img]",
        "value": "content"
      },
      {
        "type": "text[hashtag:mention:text:url:img]",
        "value": "Oh my god! "
      },
      {
        "type": "mention",
        "value": "Bingus"
      },
      {
        "type": "text",
        "value": " is just the cutest! "
      },
      {
        "type": "hashtag",
        "value": "bingusourlordandsaviour"
      },
      {
        "type": "url",
        "value": "www.bingusmerch.com"
      }
    ]
  }
]
```





