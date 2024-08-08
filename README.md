# My Project
BOOKSTORE APP 

This project is a comprehensive bookstore application developed within an Nx monorepo structure. It includes two main applications:

Client: A dynamic frontend built with Angular.
Server: A robust backend powered by Express.
Additionally, there is a shared library, app-configuration, that facilitates seamless integration between the frontend and backend services.

Key Technologies:
PostgreSQL: Serves as the primary database for storing and managing book data.
Firebase: Utilized for authentication and authorization, ensuring secure user management.
Google Books API: Integrated for retrieving detailed book information directly from Google’s extensive book database.
This architecture is designed to provide a scalable, maintainable, and high-performance platform for managing a bookstore application.

## Installation

1. Clone the repository: https://github.com/AleksandraP995/nx-mean-bookstore.git

2. Install dependencies: npm install

## Start the application

To start the client in development mode run `npx nx serve client`
To start the server in development mode run `npx nx serve server`
To start the app-configuration in development mode run `npx nx serve app-configuration`

## Build for production

Run 
`npx nx build client` 
`npx nx build server`
`npx nx build app-configuration`
to build the application. The build artifacts are stored in the output directory (e.g. `dist/`), ready to be deployed.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.

## Contact

Created by [Aleksandra Panic](https://www.linkedin.com/in/aleksandrapanicfed) - feel free to contact me!
