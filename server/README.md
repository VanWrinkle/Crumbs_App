# API

## instructions

- React and Express (this API) are built as separate projects for now.
- Prerequisites:
  - The files *server.crt* and *private-key.pem* must be present in the root directory of this service
  - One time only: Execute `npm install` in *client* and *server* directories to install the dependencies for both projects.
- Starting the API with `npm start` will also trigger a production build of the React project.
- The service does not immediately reflect changes from React. This service must either be restarted to trigger a new build or
  by manually executing `npm run build` from the client directory.

## toc

[TOC]


<br>
<br>
<br>

## GET

---



[back to top](#toc)



### / root

#### Description

> The base url will result in the user being served the application through index.html.

#### Request

- HTTP Method: `GET`
- URL: `/`
- Content-Type: `text/html`

#### Response

- HTTP Method: `200 OK`
- Content-Type: `text/html`
- Body: `index.html`
- Note: The response body is the index.html file, which is the entry point for the React application. The React application will then handle the routing.


---

[back to top](#toc)

<br>
<br>
<br>

###  getProfileInfo

#### Description

> This endpoint is used to get information about a user's profile. The information is returned as a JSON object.

#### Request

- HTTP Method: `GET`
- URL: `/api/getProfileInfo/:profileOwner`


#### Response

On Success:
- Content-Type: `application/json`
- Status:
  - `200 OK`
    - The request was successful
- Body:
  ````json
  {
      "username": "vanwrinkle",
      "joined": 1698146653614,
      "is_followed_by_user": false,
      "followers_count": 8,
      "following_count": 8
  }
  ````

On Failure:

- [ ] HTTP Method: `400 Bad Request`
  - Issued in cases where the username is missing
- [ ] HTTP Method: `404 Not Found`
  - Issued in cases where the user does not exist
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued in cases where the server fails to handle the request due to an internal error
- [ ] HTTP Method: `504 Gateway Timeout`
  - Issued in cases where the database connection fails

---

[back to top](#toc)

<br>
<br>
<br>

### getMainFeed



#### Description

> This endpoint is used to get the main feed. The main feed is the feed that is shown to the user when they are not viewing a specific user's profile. The feed is returned as a JSON array of posts.

#### Request

- HTTP Method: `GET`
- URL: `/api/getMainFeed`
- Queries:
  - `filter_out_own=[true:false]`
    - If true, the user's own posts will not be included in the feed
    - Default: `true`
  - `parent=[parent_crumb_id]`
    - If this query is present, the feed will return the replies to the crumb with the given id
    - Default: `null`
  - `sort=[time:engagement]`
    - `time`: Sort by time
    - `engagement`: Sort by engagement
    - Default: `time`
  - `order=[asc:desc]`
    - `asc`: Ascending order
    - `desc`: Descending order
    - Default: `desc`
  - `max_posts=[number]`
    - Max count of returned entities per request
    - Default: `10`
  - `continue_from=[post_id]`
    - The post id to continue from. If sorting on time, the timestamp of that post is used as the starting point. If sorting on engagement, the engagement score of that post is used as the starting point.
    - Default: `null`

#### Response
On Success:
- Content-Type: `application/json`
- Status:
  - `200 OK`: The request was successful

```json
[
  {
    "author": "crumbsfuglen",
    "timestamp_milliseconds": 1699525894202,
    "post_id": "67",
    "likes": 0,
    "replies": 0,
    "liked": false,
    "contents": [
      {
        "type": "text",
        "value": "🐼"
      }
    ]
  },
  {
    "author": "crumbsfuglen",
    "timestamp_milliseconds": 1699522518757,
    "post_id": "66",
    "likes": 0,
    "replies": 0,
    "liked": false,
    "contents": [
      {
        "type": "text",
        "value": "Dette er enda en post."
      }
    ]
  },
 ... 2 of 10 posts shown
]
```

On Failure:
- [ ] HTTP Method: `404 Not Found`
  - Issued in cases where the parent crumb does not exist
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued in cases where the server fails to handle the request due to an internal error
- [ ] HTTP Method: `504 Gateway Timeout`
  - Issued in cases where the database connection fails


---

[back to top](#toc)

<br>
<br>
<br>

### getReplies


#### Description

> This endpoint is used to get the replies to a crumb. The replies are returned as a JSON array of posts.

#### Request

- HTTP Method: `GET`
- URL: `/api/getReplies/:parent_id`
- Queries:
  - `show_own_replies=[true:false]`
    - If false, the replies of the user will not be included in the list of replies
    - Default: `false`
  - `sort=[time:engagement]`
    - `time`: Sort by time
    - `engagement`: Sort by engagement
    - Default: `time`
  - `order=[asc:desc]`
    - `asc`: Ascending order
    - `desc`: Descending order
    - Default: `desc`
  - `max_posts=[number]`
    - Max count of returned entities per request
    - Default: `10`
  - `continue_from=[post_id]`
    - The post id to continue from. If sorting on time, the timestamp of that post is used as the starting point. If sorting on engagement, the engagement score of that post is used as the starting point.
    - Default: `null`

#### Response

**On Success:**

- Content-Type: `application/json`
- Status:
  - `200 OK`: The request was successful
- Body: 
  ```json
  [
    {
      "author": "crumbsfuglen",
      "timestamp_milliseconds": 1699525894202,
      "post_id": "67",
      "likes": 0,
      "replies": 0,
      "liked": false,
      "contents": [
        {
          "type": "text",
          "value": "🐼"
        }
      ]
    },
    ...
  ]
  ```

**On Failure:**
- [ ] HTTP Method: `400 Bad Request`
  - Issued in cases where the parent id is missing
- [ ] HTTP Method: `404 Not Found`
  - Issued in cases where the parent crumb does not exist
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued in cases where the server fails to handle the request due to an internal error
- [ ] HTTP Method: `504 Gateway Timeout`
  - Issued in cases where the database connection fails


---

[back to top](#toc)

<br>
<br>
<br>

### getUserFeed


#### Description

> This endpoint is used to get the feed of a specific user. The feed is returned as a JSON array of posts. The feed is sorted on time

#### Request 

- HTTP Method: `GET`
- URL: `/api/getUserFeed/:username`
- Queries:
  - `max_posts=[number]`
    - Max count of returned entities per request
    - Default: `10`
  - `continue_from=[post_id]`
    - The post id to continue from. 
    - Default: `null`

#### Response

**On Success:**

- Content-Type: `application/json`
- Status:
  - `200 OK`: The request was successful
- Body:

  ````json
  [
    {
      "author": "crumbsfuglen",
      "timestamp_milliseconds": 1699525894202,
      "post_id": "67",
      "likes": 0,
      "replies": 0,
      "liked": false,
      "contents": [
        {
          "type": "text",
          "value": "🐼"
        }
      ]
    },
    ...
  ]
  ````

**On Failure:**

  - [ ] HTTP Method: `400 Bad Request` 
    - Issued if the username is missing
  - [ ] HTTP Method: `404 Not Found`
    - If there is no such user
  - [ ] HTTP Method `500 Internal Server Error`
    - Undisclosed internal error
  - [ ] HTTP Method: `504 Gateway Timeout`
    - Issued in cases where the database connection fails

---

<br>
<br>
<br>

---

## POST

---

[back to top](#toc)

### register


#### Description

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
**On Success**

  - HTTP Method: `201 Created`

**On Failure:**

- [ ] HTTP Method: `409 Conflict`
  - Issued in cases where an account already exist with that username
- [ ] HTTP Method: `422 Unprocessable Entity`
  - Issued in cases where the password does not meet the security requirements or are missing
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued in cases where the hashing algorithm fails
- [ ] HTTP Method: `504 Gateway Timeout`
  - Issued in cases where the database connection fails

---

[back to top](#toc)

<br>
<br>
<br>

### login


#### Description

> Logging in is mandatory for all endpoints that are capable of performing actions on behalf of the user, such as posting crumbs, deletion of an account and similar.

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
**On Success:**
  - HTTP Method: `200 OK`
  - Content-Type: `application/json`
  - Response Body:
    ```json
    {
      "token": "JSON_WEB_TOKEN_STRING....."
    }
    ```
**On Failure:**
  - [ ] HTTP Method: `400 Bad Request`
    - Issued in cases where username or password are missing
  - [ ] HTTP Method: `401 Unauthorized`
    - Issued in cases where the username and/or password does not match any existing account
  - [ ] HTTP Method: `500 Internal Server Error`
    - Issued in cases where the hashing algorithm fails

---

[back to top](#toc)

<br>
<br>
<br>

### logout


#### Description

> This endpoint is used to log out the user.

#### Request

- URL: `/api/logout`
- HTTP Method: `POST`

#### Response

- Success:
  - HTTP Method: `200 OK`


---

### renew

> This endpoint is used to renew the user's session. The user must be logged in to use this endpoint.

#### Request

- URL: `/api/renew`
- HTTP Method: `POST`

#### Response
On Success:
- HTTP Method: `200 OK`
- Content-Type: `application/json`
- Body:
````json
{
  "username": "exampleName",
  "ttl": 1698146653614
}
````

On Failure:
- [ ] HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request for renewal due to an internal error

---

[back to top](#toc)

<br>
<br>
<br>

### postCrumb

#### Description

> This endpoint is used to post a crumb. The user must be logged in to use this endpoint. The crumb can be a reply or a free-standing crumb.

#### Request

- URL: `/api/postCrumb`
- HTTP Method: `POST`
- Content-Type: `application/json`
- Body:

```json
  {
    "parent": "The id of the parent crumb, if any",
    "contents": "This is the contents of the crumb in plaintext, to be parsed by the server"
  }
```

#### Response

On Success:
- HTTP Method: `201 Created`

On Failure:
- HTTP Method: `400 Bad Request`
  - Issued in cases where the contents are missing
- HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request for renewal due to an internal error


---

[back to top](#toc)

<br>
<br>
<br>

### likeCrumb

> This endpoint is used to like a crumb. The user must be logged in to use this endpoint.

#### Request

- URL: `/api/likeCrumb/:crumb_id`
- HTTP Method: `POST`

#### Response
On Success:

- HTTP Method: `201 Created`

On Failure:

- [ ] HTTP Method: `400 Bad Request`
  - Issued in cases where the crumb id is missing
- [ ] HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- [ ] HTTP Method: `404 Not Found`
  - Issued in cases where the crumb does not exist
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request for renewal due to an internal error
- [ ] HTTP Method: `504 Gateway Timeout`
  - Issued in cases where the database connection fails

---

[back to top](#toc)

<br>
<br>
<br>

### followUser

#### Description 

> This endpoint is used to follow a user. The user must be logged in to use this endpoint.

#### Request

- URL: `/api/followUser/:username`
- HTTP Method: `POST`

#### Response

On Success:
- HTTP Method: `201 Created`

On Failure:
- [ ] HTTP Method: `400 Bad Request`
  - Issued in cases where the username is missing
- [ ] HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request for renewal due to an internal error
- [ ] HTTP Method: `400 Bad Request`
  - Issued when the username is missing

---

<br>
<br>
<br>

---

## DELETE

---


[back to top](#toc)



### likeCrumb

#### Description

> This endpoint is used to unlike a crumb. The user must be logged in to use this endpoint.

#### Request

- URL: `/api/likeCrumb/:crumb_id`
- HTTP Method: `DELETE`

#### Response
**On Success:**
- HTTP Method: `204 No Content`
  - Issued when the crumb is successfully unliked

**On Failure:**
- [ ] HTTP Method: `400 Bad Request`
  - Issued when the crumb id is missing
- [ ] HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- [ ] HTTP Method: `404 Not Found`
  - Issued in cases where the crumb does not exist
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request for renewal due to an internal error
- [ ] HTTP Method: `504 Gateway Timeout`
  - Issued in cases where the database connection fails

---

[back to top](#toc)

<br>
<br>
<br>

### deleteUser 

#### Description 

> This endpoint is used to delete a user. The user must be logged in to use this endpoint.



#### Request

- URL: `/api/deleteUser/:username`
- HTTP Method: `DELETE`

#### Response
**On Success:**
- HTTP Method: `204 No Content`
  - Issued when the user is successfully deleted

**On Failure:**
- [ ] HTTP Method: `400 Bad Request`
  - Issued in cases where the username is missing
- [ ] HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request for deletion due to an internal error

---

[back to top](#toc)

<br>
<br>
<br>
  
### followUser

#### Description

> This endpoint is used to unfollow a user. The user must be logged in to use this endpoint.

#### Request

- URL: `/api/followUser/:username`
- HTTP Method: `DELETE`

#### Response

On Success:
- HTTP Method: `204 No Content`
  - Issued when the user is successfully unfollowed, or if the user was not followed in the first place

On Failure:
- [ ] HTTP Method: `401 Unauthorized`
  - Issued in cases where the user is not logged in
- [ ] HTTP Method: `500 Internal Server Error`
  - Issued when the server fails to handle the request.
- [ ] HTTP Method: `400 Bad Request`
  - Issued when the username is missing
- [ ] HTTP Method: `404 Not Found`
  - Issued when the user to unfollow does not exist


































