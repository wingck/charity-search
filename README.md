# Charity Finder

Charity Finder is a React application that allows users to search for charities, view detailed information about a specific charity, and save their favorite charities to a list. The application is built using TypeScript and uses the [Every.org API](https://partners.every.org/docs/) to fetch the charity data.

## Features

- **Search**: Users can search for charities using keywords and autocomplete.
- **Charity Details**: Users can view detailed information about a specific charity including its name, description, location, and logo.
- **Favorites**: Users can save their favorite charities to a list and view them later. The favorite charities are stored in the local storage.

## Installation

1. Clone the repository:

git clone https://github.com/williamphk/charity-finder-ts.git

2. Change to the project directory:

cd charity-finder-ts

3. Install the dependencies:

npm install

4. Start the development server:

npm start

The application will be served at `http://localhost:3000/`.

## Deployment

The application can be deployed to Vercel by following these steps:

1. Create a new project on [Vercel](https://vercel.com/).
2. Connect your GitHub repository.
3. Add the `VITE_API_KEY` environment variable in the Vercel project settings.
4. Deploy the application.

## License

MIT
