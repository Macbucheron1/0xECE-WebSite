# Web Tech API - ECE webtech 101

This is the API for the Web tech course at ECE Paris. It allows users to manage articles and comments programmatically.

## Prerequisites

Before trying to install the API, make sure to install the following technologies:

- **[npm](https://docs.npmjs.com/cli/v10/commands/npm-install)** (v10.8.2 +)
- **[Node.js](https://nodejs.org/en/download/package-manager)** (v20.17.0 +)

## Install

Follow these steps to install the API locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/Macbucheron1/0xECE-WebSite
    ```

2. Access the API directory:

    ```bash
    cd fall2024-webtech-101/api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the API:

    ```bash
    npm start
    ```

## Endpoints

- **Home**: The main page where users can navigate to either the **Hello** or **Articles** pages.

- **Hello**: Display a personalized greeting. Example usage:
    - Navigate to `/hello?=nathan` to see a custom message.

- **Articles**: Manage a list of articles.

    - **List articles**: `GET /articles`
    
    - **Add article**: 
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

    - **Add comment to an article**:
    ```bash
    curl -X POST http://localhost:8080/articles/1/comments \
    -H "Content-Type: application/json" \
    -d '{
        "id": "1",
        "content": "Ceci est un commentaire.",
        "author": "Nathan Deprat"
    }'
    ```
