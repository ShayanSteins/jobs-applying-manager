# jobs-applying-manager

Version française [ici](README.md).

## Table of contents
1. [Summary](#summary)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Use](#use)  
  5.1 [Client](#client)  
  5.2 [Server](#server)  
6. [Changelog](#changelog)  
  6.1 [v2.0](#v20)  
  6.2 [v1.0](#v10)  


## Summary

jobs-applying-manager is a job search helper app with a tracking table.
You'll be able to enter opportunities, their state or appointments to follow them better.


## Technologies

- [VueJS - v2.6.12](https://vuejs.org/)
- [NodeJS - v14.15.4](https://nodejs.org/en/)
- [Parcel Bundler - 1.12.4](https://parceljs.org/)


## Installation

1. Run the command :  

    ```
    npm install
    ```

2. Generate https certificates

3. Create an OAuth app on your GitHub (cf: [Create OAuth Apps](https://docs.github.com/en/developers/apps/creating-an-oauth-app)).


## Configuration

Modify the config file [config.json](#server/assets/config.json) according to your needs :

```json
{
  "basePath" : <path to parcel build folder>, 
  "serverPath" : <path to app server folder>,
  "keyPath" : <path to 'key.pem' file>,
  "certPath" : <path to 'cert.pem' file>,
  "port" : <server listening port>,
  "OAuthKeysPath": <path to json file which contain OAuth clientId and clientSecret>
}
```

## Use

### Client

Run the following command for client dev mode only :

    npm run dev

Run the following command for client dev mode with server : 

    npm run watch

Run the following command to create the executable build version :

    npm run build

### Server

Run the following command to start the server :

    node <path to 'index.js' file from server>

## Changelog

### v2.0  

The following updates has been made with version 2 :

- NodeJS Https server added
- OAuth authentification from GiHub
- Replacement of 'data.js' unique file with a 'datasXXXXX.json' file per each authenticated user
- Json file updated with datas modifications from client
- LocalStorage removed

### v1.0  

The first version contain : 

- A dashboard containing all jobs opening and their next interview to come
- Add, Modify and Delete jobs opening and interview
- For each opportunity, a modified fields history
