# MERN Material Demo web application

This project implements a web application skeleton within the JavaScript
ecosystem using the _Mongo-Express-React-Node_ stack. The main idea is to set up
a rudimentary system that can be "easily" developed further into a real
full-stack JavaScript application. 

![Screenshot](https://raw.githubusercontent.com/malmgrek/mern-material-demo/develop/resources/screenshot.png
"Landing page")

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Quick start](#quick-start)
  - [Installation step-by-step](#installation-step-by-step)
      - [JavaScript packages](#javascript-packages)
      - [Install MongoDB in Docker](#install-mongodb-in-docker)
  - [NixOS support](#nixos-support)

<!-- markdown-toc end -->


## Introduction

The "MERN stack" consists of:

- **MongoDB** as the database
- **Express.js** to build the backend API
- **React** to build the web browser UI
- **Node.js** to run the web server in general

In addition to the above tools, this project also uses

- [Material UI](www.mui.com "Visit MUI.com") React component library to obtain
  reasonable looking extensible visual components
- JSON Web Tokens for auth session handling
- React-Redux to manage application state

## Requirements

Node.js, Docker and Yarn should be installed.

## Quick start

The service can be locally set up with GNU Make

  - `make install` 
  - `make up -j2`: Sets up the application at `http:localhost:8000`. Note that
    we start two processes, one for the server and the client, respectively.
  - `make db-reset`: Clean up database. Useful when making changes.
  - `make clean`: Clean up development environment

## Installation step-by-step

### JavaScript packages

Install client and server JS packages (separately in the respective
`node_modules` folders) by running `yarn install` in `server/` and `client/`,
respectively.

### Install MongoDB in Docker

Install and run MongoDB in a Docker container:

``` shell
docker run -d --name mongodb -p 27017:27017 mongo
```

Data will be stored in the container. MongoDB image will be downloaded, and the
service will be running at `http://localhost:27107`. Start both servers with

``` shell
cd server && yarn server
cd client && yarn start
```

Afterwards, the application should be accessible at `http://localhost:8000`. When
development is finished, you can remove the MongoDB docker.

## NixOS support

Start a `nix-shell` in the project root directory. The shell definition will
be based on `default.nix`. Otherwise proceed as above.

<!-- ### Docker-compose -->


