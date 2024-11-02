# Web Tech Client - ECE webtech 101

This is the client-side of the Web Tech course project at ECE Paris, designed for blogging purposes. The website is built using React and Next.js, and allows users to navigate through multiple pages such as Home, About, Contacts, and Articles

## Prerequisites

Before trying to install and run the client, make sure to install the following technologies:

- **[npm](https://docs.npmjs.com/cli/v10/commands/npm-install)** (v10.8.2 +)
- **[Node.js](https://nodejs.org/en/download/package-manager)** (v20.17.0 +)

## Install

Follow these steps to install the client locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/Macbucheron1/fall2024-webtech-101.git
    ```

2. Access the client directory:

    ```bash
    cd fall2024-webtech-101/client
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the project:

    ```bash
    npm build
    npm start
    ```

## Pages

- **Home**: The main landing page that introduces the website.
    - Route: `/`

- **About**: Information about the website or the project.
    - Route: `/about`

- **Contacts**: A page where users can find contact information or reach out.
    - Route: `/contacts`

- **Articles**: A list of articles with dynamic routes for each article's details.
    - Route: `/articles`
    - Dynamic route for individual articles: `/articles/:articleId`

