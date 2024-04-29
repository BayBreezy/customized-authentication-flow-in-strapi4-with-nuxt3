# Customized Authentication Flow in Strapi CMS (Nuxt 3)

In this tutorial, I'll guide you through customizing the authentication flow in Strapi and integrating it seamlessly with a Nuxt 3 frontend.

## Tutorial

[![Cover](/cover.png)](https://youtu.be/Wm2FilArvJI)

### [Customized Authentication Flow in Strapi CMS (Nuxt 3) Full Tutorial](https://youtu.be/Wm2FilArvJI)

## Diagrams ([Eraser.io](https://app.eraser.io/))

#### Login Flow Diagram

[View on Eraser![](https://app.eraser.io/workspace/yM4OsHZvtf9XGu0bwiUh/preview?elements=Jh6sHiUr8DwPeDxQCQcLjw&type=embed)](https://app.eraser.io/workspace/yM4OsHZvtf9XGu0bwiUh?elements=Jh6sHiUr8DwPeDxQCQcLjw)

#### Sign up Flow Diagram

[View on Eraser![](https://app.eraser.io/workspace/yM4OsHZvtf9XGu0bwiUh/preview?elements=3JDAHmnK5Ycjb8XUn-2ojA&type=embed)](https://app.eraser.io/workspace/yM4OsHZvtf9XGu0bwiUh?elements=3JDAHmnK5Ycjb8XUn-2ojA)

## What is Strapi?
Strapi is an open-source headless content management system (CMS) built with Node.js. It enables developers to create powerful and customizable APIs with ease, allowing content to be managed and delivered across different platforms and devices.

### Key features of Strapi
- It's a **Headless CMS** that does not dictate how content is present on the frontend
- It has **Customizable Content Types** that gives the developer the power to define their own content types and attributes.
- It provides **RESTful and GraphQL APIs**
- It gives **User Authentication and Permissions** out of the box
- Its modular architecture allows developers to extend its functionality with custom plugins or by installing existing ones from the Strapi marketplace([market.strapi.io/](https://market.strapi.io/))
- Strapi supports various databases, including  PostgreSQL, MySQL, SQLite, and MariaDB, giving developers the flexibility to choose the database that best suits their project requirements.


## Key terms
- **Content Type** - It's like defining the blueprint for your database tables, specifying what kind of information they will store.
- **Collection Type** -  Stores multiple entries of the same content type. Think of it as a container for similar items, like a list of products in an online store.
- **Single Type** -  Stores only one entry of data, typically for singleton information. It's like having a single file to store unique settings or configurations for your entire application.
- **API** -   Interface for interacting with your application's data. It's like a waiter in a restaurant who takes your order (request) and brings you the food (response).
- **Plugin** - This adds additional functionality to your Strapi project.  If you want to extend the core functionalities of your Strapi project, you can add a community plugin or create one of your own.
- **Roles and Permissions** - Manage access control for users and content. It's like setting up rules to decide who can access certain areas or perform specific actions in your application, similar to granting different levels of access in a building.
- **Middleware** - Functions executed before or after a request is handled. It's like filters that clean or modify data before it reaches its destination, similar to a security checkpoint at an airport.
- **Lifecycle Hooks** - Functions triggered at different stages of an operation. They're like alarms that go off at specific times during a process, allowing you to perform custom actions, like sending a notification when a new user signs up.
