# Politico

[![Build Status](https://travis-ci.org/olamilekan000/Politico.svg?branch=ch-set-up-travis-163579249)](https://travis-ci.org/olamilekan000/Politico) [![Coverage Status](https://coveralls.io/repos/github/olamilekan000/Politico/badge.svg?branch=ch-set-up-travis-163579249)](https://coveralls.io/github/olamilekan000/Politico?branch=ch-set-up-travis-163579249)

*Politico is an online political and electoral management system*

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Built Using](#built-using)
* [Installation and Configuration](#installation-and-configuration)
* [Running the Application](#running-the-application)
>- [Development Environment](#development-environment)
* [Features](#features)
* [To Contribute](#to-contribute)
* [License](#license)

## Built Using

* [HTML]

* [CSS]

* [Vanilla JavaScript]

* [Node.js](<https://nodejs.org/en/>)
>- [express](<https://expressjs.com/>)

* [PostgreSQL](<https://www.postgresql.org/>)

## Installation and Configuration

Before Installation, ensure you have node.js and PostgreSQL installed on your device.

* Clone the Repository

```bash
git clone https://github.com/olamilekan000/Politico
```

* Install Dependencies
```bash
npm i
```

## Running the Application

The Politico application can be run either from a development or testing environment.

### Development Environment

Default debugging mode, uses nodemon to restart server as changes are made

#### To Run in Development Environment

* Open the terminal
>- Start the Back End Server

```bash
npm run start
```

## Features

The Hello Books API uses signed Json Web Tokens for authorization.

Regular (Authenticated) Users to the Application can perform the following:

* Vote for a political candidate
* Become a Candidate
* Raise a petition
* Read the profiles the Candidates

Authenticated Admin Users to the application can perform the folllowing (in addition to the functionalities of regular users)

* Create a political party

* Create a political office

* Approve aspiring candidates

* Delete a political office

* Edit a Political Office


## To Contribute

Contributions are welcome.
Code should (as much as possible) conform to the [Airbnb](<https://github.com/airbnb/javascript>) javascript style guide.

* Make of fork of the repository
* Create a branch
* **Make Changes**
* Test changes
* Make for Pull Request against Develop
>- Pull Requests against Master would likely be ignored

---

## License

MIT License
