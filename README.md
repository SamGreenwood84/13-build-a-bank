# 13-e-commerce

# Description 

Object-Relational Mapping (ORM) Challenge: E-commerce Back End

# Table of Contents

- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Built-With](#built-with)
- [References](#references)
- [Deployment](#deployment)
- [License](#license)

# Live Demo

Live Demo Video Here

# Getting Started

1. Clone gitHub repository
2. NPM Install
3. Use command server.js

# User Story

AS A manager at an internet retail company

I WANT a back end for my e-commerce website that uses the latest technologies

SO THAT my company can compete with other e-commerce companies

# Acceptance Criteria

GIVEN a functional Express.js API

WHEN I add my database name, MySQL username, and MySQL password to an environment variable file

THEN I am able to connect to a database using Sequelize

WHEN I enter schema and seed commands

THEN a development database is created and is seeded with test data

WHEN I enter the command to invoke the application

THEN my server is started and the Sequelize models are synced to the MySQL database

WHEN I open API GET routes in Insomnia Core for categories, products, or tags

THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia Core

THEN I am able to successfully create, update, and delete data in my database

# Built-with

```javascript
  "dependencies": {
    "dotenv": "^16.4.5",
    "mysql2": "^3.9.2",
    "sequelize": "^6.37.1"
  }
```
**Insomnia App**

**MySQL Workbench**

# References

**Bootcamp Spot Modules 12 & 13**

**Associations Diagram**

```java
        +------------------+           +------------------+
        |     Category     |           |     Product      |
        +------------------+           +------------------+
        | id               |<--------->| id               |
        | name             |           | name             |
        |                  |<--------->| categoryId       |
        +------------------+           +------------------+
                |                               |
                |                               |
                |                               |
                |                               |
                |                  +------------v-------------+
                |                  |    ProductTag          |
                |                  +------------------------+
                |                  | productId              |
                |                  | tagId                  |
                |                  +------------------------+
                |                               |
                |                  +------------v-------------+
                +------------------|     Tag                |
                                     +------------------------+
                                     | id                     |
                                     | name                   |
                                     +------------------------+
```
In this diagram:

Each box represents a table in the database.
Arrows between boxes represent relationships between the tables.
The belongsTo relationships are represented by a line with a single arrow pointing to the parent table.
The hasMany relationships are represented by a line with a single arrow pointing to the child table.
The belongsToMany relationship is represented by a many-to-many join table (ProductTag), which contains foreign keys to both Product and Tag.
Product has a foreign key (categoryId) referencing the Category table.
Product and Tag have a many-to-many relationship through the ProductTag table.


# Deployment

My GitHub Repo Link: [Click Here!](https://)

Live Demo Link: [Click Here!](https://)

# License

MIT License

Copyright (c) 2024 SamGreenwood