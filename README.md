<h1 align="center">
  Ember Gardens: GatbsyJS Frontend
</h1>

Ember Gardens is a website built on the React & GatsbyJS Framework, using Wordpress as a headless CMS which provides a GraphQL data layer.

## 🧱 Structure & Hosting

Since Wordpress is being used in a headless way, it means the backend is completely decoupled from the front-end experience.
That means each has their own repo, hosting and domain.

### Front-end (React / Gatsby)
- **Repo**: [ember-gardens-com](https://github.com/embergardens/ember-gardens-com)
- **Hosting**: [Gatsby Cloud](https://www.gatsbyjs.com/dashboard/organization/3346176b-e663-4361-bb7a-cb6a2aa9bd64/sites)
- **Domain**: [https://embergardens.com](https://embergardens.com) - managed by [1 & 1](https://www.ionos.com/) & SSL provided by Gatsby Cloud

## Back-end (Wordpress)
- **Repo**: [EmberHarvest: Custom Headless Wordpress Theme](https://github.com/embergardens/emberharvest)
- **Hosting**: [Flywheel](https://app.getflywheel.com/sites#)
- **Domain**: Both domains are managed by [1 & 1](https://www.ionos.com/) & SSLs are provided by Flywheel
  - **Primay**: [Ember Gardens WP Production Admin](https://admin.embergardens.com/wp-admin/)
  - **Staging**: [Ember Gardens WP Staging Admin](https://admin-embergardens.flywheelstaging.com/wp-admin/)

## 🚀 Quick start

1. In your terminal run **`npm install`**. _Note: Make sure you are running Node Version 18.12.1_

2. For **local development** run **`gatsby develop`**, which will start up a development server using the _Staging_ Wordpress Admin.
   _Note: If Staging hasn't been used in a while it will go to sleep. [Sign-in](https://admin-embergardens.flywheelstaging.com/wp-admin/) first to make sure its awake before starting the dev server._

3. During development if you aren't seeing specific changes, stop your server and run **`gatsby clean`** to clear the local cache.

## 🔧 Development Notes

- This site uses **SCSS** for pre-processing CSS. Those partials are located in **`/src/css-dev`** - they compile automatically during build or on save if the development server is running.

- Wordpress provides a **GraphQL** data layer for all of its content. Those data fragments are located in **`/src/data`**. [GraphQL Docs](https://graphql.org/)

- This site uses **Recoil** for React State Management. Those stores are located in **`/src/store`**. [Recoil Docs](https://recoiljs.org/)

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── create
    ├── node_modules
    ├── plugins
    ├── public
    ├── src
    ├── static
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/create`**: This directory contains all of the modules for dynamically building new page types based on the post types created in Wordpress.

2.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

3.  **`/plugins`**: This directory contains all local plugins. Most plugins are imported from NPM, however the plugin that manages Gravity Forms needed to be foked and customized. The older versions of this plugin live in the folder for reference.

4.  **`/public`**: This directory is populated by Gatsby during builds. **(You won’t change these files directly).**

5.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

6.  **`/static`**: This directory should only be used for files you don't want imported. Learn more here: [Static Folder](https://www.gatsbyjs.com/docs/how-to/images-and-media/static-folder/)

7.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

8.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

9.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

10.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail). ***Wordpress Users:** This is where you configure your wordpress URL, and provide other plugin settings.*

11. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process. ***Wordpress Users:** This is where you customize how gatsby consumes your wordpress graphql schema, and generates your gatsby content schema. The starter will handle post and blog types.*

12. **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

13. **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

14. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

15. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

16. **`README.md`**: A text file containing useful reference information about your project.


## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
