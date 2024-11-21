# jobs-applying-manager

English version [here](README_en.md).

## Table des matières
1. [Informations générales](#informations-générales)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)  
  5.1 [Client](#client)  
  5.2 [Serveur](#serveur)  
  5.3 [Tests](#tests)  
6. [Changelog](#changelog)  
  6.1 [v3.0](#v30)  
  6.2 [v2.0](#v20)  
  6.3 [v1.0](#v10)  


## Informations générales

jobs-applying-manager est une application d'aide à la recherche d'emploi via un tableau de suivi de piste.  
Ainsi il est possible de saisir les différentes opportunités qui vous intéresse et de visualiser d'un seul coup d'oeil l'avancé de chacune.
Il s'agit principalement d'un projet d'entrainement.


## Technologies

- [VueJS 3](https://vuejs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/fr/)
- [Parcel Bundler](https://parceljs.org/)


## Installation

1. Lancez la commande :  

    ```
    npm install
    ```

2. Générez les certificats https

    ```
    sudo openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout key.pem -out cert.pem 
    ```

3. Créez une application OAuth sur votre GitHub (cf: [Create OAuth Apps](https://docs.github.com/en/developers/apps/creating-an-oauth-app)).


## Configuration

Modifiez le fichier de configuration [config.json](/server/assets/config.json) selon vos besoins :

```json
{
  "basePath" : <chemin d'accès au dossier build de parcel>, 
  "serverPath" : <chemin d'accès au dossier server de l'appli>,
  "dbPath": <chemin d'accès au dossier userDB>,
  "assetsPath": <chemin d'accès au dossier assets>,
  "keyPath" : <chemin d'accès au fichier 'key.pem'>,
  "certPath" : <chemin d'accès au fichier 'cert.pem'>,
  "port" : <port d'écoute du serveur>,
  "OAuthKeysPath": <chemin d'accès au fichier json contenant les clientId et clientSecret de l'application OAuth>
}
```

## Utilisation

Voici la liste des commandes utilisables dans ce projet :

### Client

- `npm run dev` : mode développement du client
- `npm run watch` : mode développement du client avec hot-reload
- `npm run build` : génère la version build exécutable

### Serveur

- `npm run build` : démarre le serveur

### Tests

- `npm run check` : lance les checks TS
- `npm run test` : lance les tests unitaires
- `npm run coverage` : lance les tests et calcul le coverage


## Changelog

### v3.0

Les modifications suivantes ont été apportées à la version 3 :

- Mises à jour de l'ensemble des librairies et corrections des vulnerabilities
- Migration de Vue 2 à Vue 3 en Composition API
- Ajout de Typescript dans le backend
- Refactor du backend pour se diriger vers une Architecture Hexagonale et du Domain-Driven Design (DDD)
- Ajout de tests unitaires avec Jest

### v2.0  

Les modifications suivantes ont été apportées à la version 2 : 

- Mise en place d'un serveur NodeJS Https
- Authentification via l'OAuth de GitHub
- Remplacement du fichier unique data.js par un fichier datasXXXXX.json pour chaque utilisateur qui s'authentifie
- Modification des données répercutées dans ces fichiers json
- Suppression du LocalStorage

### v1.0  

La première version de l'outil contient : 

- Un tableau de bord permetant d'afficher l'ensemble des pistes ainsi que les prochains rendez-vous à venir
- L'ajout, la modification et la suppression de piste et de rendez-vous
- Un historique des champs modifiés pour chaque piste.
