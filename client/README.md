# Web Tech Client - ECE webtech 101

This is the client-side of the Web Tech course project at ECE Paris, designed for blogging purposes. The website is built using React and Next.js, and allows users to navigate through multiple pages such as Home, About, Contacts, and Articles.

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

## Pages features

- ### Home: 
    The main landing page that introduces the website.
    - **Route**: `/`
    - **Feature** :
        1. Welcome message and basic information about the website.
        2. Display of the testimonials of the users.
        3. Allow to post a testiomonials - *if connected*

- ### About: 
    Information about the website or the project.
    - **Route**: `/about`
    - **Feature** : 
        1. Brief description of the association and us.

- ### Contacts: 
    A page where users can find contact information or reach out.

    - **Route**: `/contacts`
    - **Feature** : 
        1. Contact form to send a message to the website (us)

- ### writeUps: 
    A list of writeUps with dynamic routes for each writeUps's details.
    - **Route**: `/writeUps`
        - **Feature** : 
            1. List of writeUps articles.
            2. Adding a new writeUps article - *if connected*

    - **Dynamic route** for writeUps articles: `/writeUps/:writeUpsId`
        - **Feature** : 
            1. Display of the writeUps article.
            2. Delete the writeUps article - *if connected and the author*
            3. Add a comment
            4. Access user's profile by clicking on their name or profile picture.

    - #### Edit: 
        - **Route**: `/writeUps/:writeUpsId/edit`
        - **Features**:
            1. Edit the writeUps article - *if connected and the author*

- ### Settings: 
    A page where users can change their settings.
    - **Route**: `/settings`
        - **Feature** : 
            1. Change the theme accross the website.
            2. Change the language of the website.
            3. Save those choice for when you comeback - *if connected*

- ### Profil: 
    A page where users can see their profile edit it and see other's people
    - **Dynamic Route** for profile: `/profil/[profilID]`
        - **Feature** : 
            - On the user's page: - *if connected*
                1. If connected with *Discord* fetch information (role, promo) from *__Discord API__* do give the user a role and a class if he is in the discord server of 0xECE.If not the promo can be set by the user. 
                2. Edit the user's bio using *__WYSIWYG__* editor.
                3. Add link to social media / CTF account
            - On other user's page:
                1. Display of the user's profile using gravatar or discord profile picture (user's choice).
                2. Display user's information (username, email, role, promo, bio)
                2. Display the user's profil on CTF website.
                3. Display the user's writeUps articles. - *In progress*
            

- ### Search: 
    A page where users can search for articles
    - **Route** : `/search`
        - **Features**: 
            1. Show the search result's in different categorie : user / Write-ups / Comments
            2. When displayed, those element can be clicked to access the ressources
            3. Work with partial word and highlight where they are in a ressource.

## Walkthrough

In order to test all of the application features, you can follow this walkthrough. We will go through
the different page, highlighting the task required by the project. We will also see the different bonus

> [!IMPORTANT]
> In progress

## Grading

| **Subject**                                                     | **Points** | **DONE** |
| :-------------------------------------------------------------- | :--------: | :------: |
| **Project Management**                                          |            |          |
| Naming convention                                               |     2      |    ✔     |
| Project structure                                               |     2      |    ✔     |
| **Git Usage**                                                   |            |          |
| Proper commit history                                           |     2      |    ✔     |
| **Code Quality**                                                |            |          |
| Indentation, formatting, and understandability                  |     4      |    ✔     |
| **Design, UX, and Content**                                     |            |          |
| Overall design, responsiveness, meaningful content              |     4      |    ✔     |
| **Application Development**                                     |            |          |
| Home page design                                                |     2      |    ✔     |
| Navigation bar and shared layout                                |     2      |    ✔     |
| Login/logout and profile page                                   |     4      |    ✔     |
| Post creation and display                                       |     6      |    ✔     |
| Comment creation and display                                    |     4      |    ✔     |
| Post modification and removal                                   |     4      |    ✔     |
| Search functionality                                            |     6      |    ~     |
| Use of an external API                                          |     2      |    ✔     |
| Resource access control                                         |     6      |    ~     |
| Account settings dashboard                                      |     4      |    ✔     |
| WYSIWYG integration for posts                                   |     2      |    ✔     |
| Gravatar integration                                            |     2      |    ✔     |
| Light/dark mode                                                 |     2      |    ~     |


## To do list:

- Home page CTA : What shoud be the call to action of the home page ?
- Recheck the Search functionnality so that it matches the requirement
- Check to have good RLS on supabase (every table)
- When searching, allow to search through write ups content (as an option), if it is a whole word



