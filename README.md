# Readme

## Description

"Crumbs" is a light weight social application where users can post text content, as well as 
interact with other users' content by liking and commenting on it. Crumbs was developed as part of
the course PROG2052 Integration Project at NTNU Gjøvik, where previous knowledge was to be integrated
into a project of our choosing. The application is built using a MERN stack, with the addition of Neo4j 
for storing social graph information, understood as relationships between users and user content, such as 
likes of posts, who posted what content, which users follows which users and so on.

## Purpose

This repository is mainly a mirror of course work showing off some of my work with TypeScript, Node.js, MongoDB and Neo4j.
In its current state the project runs with local mocks of external DBs only, as the 
original MongoDB and Neo4j DBs used to store user information and social graphs are no longer
running as of the completion of the course. 

## Personal Contribution

I was responsible for the backend of the project, which included the following:
- Utilization of neo4j, a graph database, to store information about relationships between users and user content such as posts, likes of posts, and comments on posts.
- Utilization of MongoDB to store user information such as usernames, passwords, and user profile information.
- Creation of a REST API using Node.js and Express.js to handle requests from the frontend and interact with the databases.
- The logic utilized to "lazily" load user content, such as posts, comments, and likes, from the databases as needed.
- The push towards utilizing interfaces and dependency injection for the purposes of:
  - Mocking out the databases and other services for test purposes.
  - Working towards the Dependency Inversion SOLID principle by having code depend on abstractions rather than concrete implementations.

