# Readme

## Purpose

This repository is mainly an import of course work done in PROG2052, Integration Project,
for the purposes of showing off some of my work with TypeScript, Node.js, MongoDB and Neo4j.
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

