[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14852943&assignment_repo_type=AssignmentRepo)
Read me, please!

# Documentation de l'API

Cette API est conçue pour gérer les utilisateurs et les publications d'un blog.

## Déploiement de l'API

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et npm installés.
3. Installez les dépendances en exécutant la commande suivante :
   ```
   npm install
   ```
4. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires (voir ci-dessous).
5. Démarrez le serveur en exécutant la commande suivante :
   ```
   npm run dev
   ```

## Variables d'environnement

Assurez-vous de configurer les variables d'environnement suivantes dans votre fichier `.env` :

`DATABASE_URL` : URL de la base de données.

`SECRET_KEY `  : Clé secrète pour la génération des jetons JWT.

`CLOUDINARY_URL` : URL de Cloudinary pour le stockage des images.

## Dépendances et prérequis système

Avant d'exécuter l'API, assurez-vous d'avoir installé les prérequis système suivants :

- Node.js
- npm
- Base de données PostgreSQL
- **@prisma/client**: ^5.13.0 - ORM (Object-Relational Mapping) pour Node.js, permettant d'interagir avec la base de données de manière simple et intuitive.
- **bcrypt**: ^5.1.1 - Bibliothèque de hachage de mots de passe sécurisée pour Node.js, utilisée pour le hachage des mots de passe des utilisateurs.
- **cloudinary**: ^2.2.0 - Service de gestion des ressources numériques basé sur le cloud, utilisé pour le stockage et la gestion des images téléchargées.
- **cors**: ^2.8.5 - Middleware Express pour gérer les requêtes CORS (Cross-Origin Resource Sharing) dans votre API.
- **dotenv**: ^16.4.5 - Module Node.js permettant de charger des variables d'environnement à partir d'un fichier `.env`.
- **express**: ^4.19.2 - Cadre de développement Web pour Node.js, utilisé pour créer des API Web et des applications Web.
- **jsonwebtoken**: ^9.0.2 - Implémentation de JSON Web Tokens (JWT) pour Node.js, utilisée pour l'authentification et l'autorisation des utilisateurs.
- **slug**: ^9.0.0 - Bibliothèque pour la création de slugs conviviaux pour les moteurs de recherche à partir de chaînes de caractères. 


## Scripts de configuration

- `dev`: Démarre le serveur en mode de développement avec nodemon pour un rechargement automatique.
- Ajoutez d'autres scripts personnalisés selon vos besoins.

## Endpoints disponibles

### Utilisateurs

- **GET /api/user/:username**
  - Récupère les informations d'un utilisateur spécifié par son nom d'utilisateur.
  - Exemple de requête :
    ```
    GET /api/user/johndoe
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 1,
      "username": "johndoe",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```

- **POST /api/user/register**
  - Enregistre un nouvel utilisateur dans le système.
  - Exemple de requête :
    ```
    POST /api/user/register
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "username": "janedoe",
      "password": "password123"
    }
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 2,
      "username": "janedoe",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
    ```

- **POST /api/user/login**
  - Connecte un utilisateur existant en vérifiant les informations d'identification.
  - Exemple de requête :
    ```
    POST /api/user/login
    {
      "email": "jane@example.com",
      "password": "password123"
    }
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "token": "jwt_token_here",
      "refreshToken": "refresh_token_here"
    }
    ```

- **POST /api/user/refreshToken**
  - Actualise le jeton d'authentification.
  - Exemple de requête :
    ```
    POST /api/user/refreshToken
    {
      "refreshToken": "refresh_token_here"
    }
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "token": "new_jwt_token_here"
    }
    ```

- **GET /api/user**
  - Récupère les informations de l'utilisateur connecté.
  - Exemple de requête :
    ```
    GET /api/user
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 2,
      "username": "janedoe",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
    ```

- **GET /api/user/all**
  - Récupère la liste de tous les utilisateurs enregistrés.
  - Exemple de requête :
    ```
    GET /api/user/all
    ```
  - Réponse attendue (exemple) :
    ```json
    [
      {
        "id": 1,
        "username": "johndoe",
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "username": "janedoe",
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    ]
    ```

- **PUT /api/user**
  - Met à jour les informations de l'utilisateur connecté.
  - Exemple de requête :
    ```
    PUT /api/user
    {
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 2,
      "username": "janedoe",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
    ```

### Publications

- **GET /api/post**
  - Récupère toutes les publications disponibles.
  - Exemple de requête :
    ```
    GET /api/post
    ```
  - Réponse attendue (exemple) :
    ```json
    [
      {
        "id": 1,
        "title": "Example Post 1",
        "summary": "Summary of Example Post 1",
        "author": {
          "id": 1,
          "username": "johndoe",
          "name": "John Doe"
        }
      },
      {
        "id": 2,
        "title": "Example Post 2",
        "summary": "Summary of Example Post 2",
        "author": {
          "id": 2,
          "username": "janedoe",
          "name": "Jane Doe"
        }
      }
    ]
    ```

- **GET /api/post/user-all**
  - Récupère toutes les publications de l'utilisateur connecté.
  - Exemple de requête :
    ```
    GET /api/post/user-all
    ```
  - Réponse attendue (exemple) :
    ```json
    [
      {
        "id": 1,
        "title": "Example Post 1",
        "summary": "Summary of Example Post 1",
        "author": {
          "id": 2,
          "username": "janedoe",
          "name": "Jane Doe"
        }
      }
    ]
    ```

- **POST /api/post**
  - Ajoute une nouvelle publication dans le système.
  - Exemple de requête :
    ```
    POST /api/post
    {
      "title": "New Post",
      "summary": "Summary of the new post",
      "description": "Full description of the new post",
      "date": "2024-05-09",
      "imageURL": "https://example.com/image.jpg"
    }
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 3,
      "title": "New Post",
      "summary": "Summary of the new post",
      "author": {
        "id": 2,
        "username": "janedoe",
        "name": "Jane Doe"
      }
    }
    ```

- **PUT /api/post/:id**
  - Met à jour une publication existante dans le système.
  - Exemple de requête :
    ```
    PUT /api/post/1
    {
      "title": "Updated Post",
      "summary": "Updated summary of the post",
      "description": "Updated description of the post",
      "date": "2024-05-10",
      "imageURL": "https://example.com/updated_image.jpg"
    }
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 1,
      "title": "Updated Post",
      "summary": "Updated summary of the post",
      "author": {
        "id": 1,
        "username": "johndoe",
        "name": "John Doe"
      }
    }
    ```

- **GET /api/post/:slug**
  - Récupère les détails d'une publication spécifiée par son slug.
  - Exemple de requête :
    ```
    GET /api/post/example-post-1
    ```
  - Réponse attendue (exemple) :
    ```json
    {
      "id": 1,
      "title": "Example Post 1",
      "summary": "Summary of Example Post 1",
      "author": {
        "id": 1,
        "username": "johndoe",
        "name": "John Doe"
      }
    }
    ```

## Authentification et autorisation

Cette API utilise JSON Web Tokens (JWT) pour l'authentification et l'autorisation. Pour accéder aux endpoints protégés, incluez le jeton d'authentification dans l'en-tête `Authorization` de la requête HTTP.

