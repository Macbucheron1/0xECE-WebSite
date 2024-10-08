# ECE webtech 101

## Description

This is the repository for the Web tech course at ECE Paris

## Prerequisites

Before trying to install the project make sur to install those technologie:

- **[npm](https://docs.npmjs.com/cli/v10/commands/npm-install)** (v10.8.2 +)
- **[Node.js](https://nodejs.org/en/download/package-manager)** (v20.17.0 +)

## Install

Follow those step to install the project localy:

1. Clone the repository:

    ```bash
    git clone https://github.com/Macbucheron1/fall2024-webtech-101.git
    ```

2. Access the project file :

    ```bash
    cd fall2024-webtech-101
    ```

3. Install dependencies :

    - With **npm** :

      ```bash
      npm install
      ```

4. Start the application :

    - With **npm** :

      ```bash
      npm start
      ```


## Usage

There is 3 pages :
1. Home

    On this page you will be able to choose to be redirected to either **_hello_** or **_articles_** page

2. Hello

    This page will allow you be granted with a meaningful and personnal message. Simply change the url with your name. If you want a brief presentation about us you can have it using our names : **Ibrahim** and **Nathan**

3. Articles

    On this page you will see a list of all the articles.
    To add an article you may use the following **curl** command :

    ```bash
    curl -X POST http://localhost:8080/articles \
    -H "Content-Type: application/json" \
    -d '{
        "id": "1",
        "title": "Mon premier article",
        "content": "Ceci est le contenu de mon article.",
        "author": "Nathan Deprat"
    }'
    ```

    When you click on an article you can see the content and of the article. If you want to see the comment section click on the *comments*
    

    ```bash
    curl -X POST http://localhost:8080/articles/1/comments \
    -H "Content-Type: application/json" \
    -d '{
        "id": "1",
        "content": "Ceci est un commentaire.",
        "author": "Nathan Deprat"
    }'

    ```



## To contribute 

Here are step you need to follow when contributing to the project:

1. Modify the file

2. Use `npm test` to test your application
    >This will use [Mocha](https://mochajs.org/#installation) and [SuperTest](https://www.npmjs.com/package/supertest)

3. Add and commit your modification using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

4. If it the end of a lab or a new version, use `git tag`

5. Push modification 

## Groupe Member
 - Nathan DEPRAT [@Macbucheron1](https://github.com/Macbucheron1)
 - Ibrahim DIALLO [@Xeroxx75](https://github.com/Xeroxx75)