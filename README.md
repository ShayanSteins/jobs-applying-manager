# JobsApplyingManager

## Table des matières
1. [Informations générales](#informations-générales)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)  
  5.1 [Client](#client)  
  5.2 [Serveur](#serveur)  
6. [Changelog](#changelog)  
  6.1 [v2.0](#v20)  
  6.2 [v1.0](#v10)  


## Informations générales

JobsApplyingManager est une application d'aide à la recherche d'emploi via un tableau de suivi de piste.  
Ainsi il est possible de saisir les différentes opportunités qui vous intéresse et de visualiser d'un seul coup d'oeil l'avancé de chacune.


## Technologies

- [VueJS - v2.6.12](https://vuejs.org/)
- [NodeJS - v14.15.4](https://nodejs.org/en/)
- [Parcel Bundler - 1.12.4](https://parceljs.org/)


## Installation

1. Lancez la commande :  

    ```
    npm install
    ```

2. Générez les certificats https

3. Créez une application OAuth sur votre GitHub (cf: [Create OAuth Apps](https://docs.github.com/en/developers/apps/creating-an-oauth-app)).


## Configuration

Modifiez le fichier de configuration [config.json](#server/assets/config.json) selon vos besoins :

```json
{
  "basePath" : <chemin d'accès au dossier build de parcel>, 
  "servPath" : <chemin d'accès au dossier server de l'appli>,
  "keyPath" : <chemin d'accès au fichier 'key.pem'>,
  "certPath" : <chemin d'accès au fichier 'cert.pem'>,
  "port" : <port d'écoute du serveur>,
  "OAuthKeysPath": <chemin d'accès au fichier json contenant les clientId et clientSecret de l'application OAuth>
}
```

## Utilisation

### Client

Lancez la commande suivante pour le mode développement du client uniquement :

    npm run dev

Lancez la commande suivante pour le mode développement du client avec le serveur :

    npm run watch

Lancez la commande suivante pour générer la version build exécutable : 

    npm run build

### Serveur

Lancez la commande suivante pour démarrer le serveur : 

    node <chemin d'accès au fichier index.js du serveur>

## Changelog

### v2.0  

Les modifications suivantes ont été apportées à la version 2 : 

- Mise en place d'un serveur NodeJS Https
- Authentification via l'OAuth de GitHub
- Remplacement du fichier unique data.js par un fichier datasXXXXX.json pour chaque utilisateur qui s'authentifie
- Modification des données répercutées dans ces fichiers json
- Suppression du LocalStorage

### v1.0  

La première version de l'outil contient : 

- Un tableau de bords permetant d'afficher l'ensemble des pistes ainsi que les prochains rendez-vous à venir
- L'ajout, la modification et la suppression de piste et de rendez-vous
- Un historique des champs modifiés pour chaque piste.
