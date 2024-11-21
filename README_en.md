# jobs-applying-manager

Version française [ici](README.md).

## Table of contents

1. [Summary](#summary)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)  
   5.1 [Client](#client)  
   5.2 [Server](#server)  
   5.3 [Tests](#tests)  
6. [Changelog](#changelog)  
   6.1 [v3.0](#v30)  
   6.2 [v2.0](#v20)  
   6.3 [v1.0](#v10)

## Summary

jobs-applying-manager is an application designed to assist with job searching through a tracking board.
It allows you to record various opportunities that interest you and visualize the progress of each one at a glance.
It is primarily a practice project.

## Technologies

- [VueJS 3](https://vuejs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/fr/)
- [Parcel Bundler](https://parceljs.org/)

## Installation

1. Run the command :

   ```
   npm install
   ```

2. Generate https certificates

    ```
    sudo openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout key.pem -out cert.pem 
    ```

3. Create an OAuth app on your GitHub (cf: [Create OAuth Apps](https://docs.github.com/en/developers/apps/creating-an-oauth-app)).

## Configuration

Change the config file [config.json](#server/assets/config.json) according to your needs :

```json
{
  "basePath" : <path to parcel build folder>,
  "serverPath" : <path to app server folder>,
  "dbPath": <path to userDB folder>,
  "assetsPath": <path to assets folder>,
  "keyPath" : <path to 'key.pem' file>,
  "certPath" : <path to 'cert.pem' file>,
  "port" : <server listening port>,
  "OAuthKeysPath": <path to json file which contain OAuth clientId and clientSecret>
}
```

## Usage

Here is the list of available commands for this project:

### Client

- `npm run dev` : client dev mode
- `npm run watch` : client dev mode with hot-reload
- `npm run build` : create the executable build version

### Server

- `npm run build` : start the server

### Tests

- `npm run check` : start checks TS
- `npm run test` : start unit tests
- `npm run coverage` : start unit tests and compute coverage

## Changelog

### v3.0

The following updates has been made with version 3:

- Update all libraries & fix vulnerabilities
- Migrate from Vue 2 to Vue 3 using the Composition API
- Integration of TypeScript in backend
- Refactoring the backend to move towards a Hexagonal Architecture and Domain-Driven Design (DDD)
- Addition of unit tests using Jest

### v2.0

The following updates has been made with version 2:

- NodeJS Https server added
- OAuth authentification from GiHub
- Replacement of 'data.js' unique file with a 'datasXXXXX.json' file per each authenticated user
- Json file updated with datas modifications from client
- LocalStorage removed

### v1.0

The first version contain:

- A dashboard containing all jobs opening and their next interview to come
- Add, Modify and Delete jobs opening and interview
- For each opportunity, a modified fields history
