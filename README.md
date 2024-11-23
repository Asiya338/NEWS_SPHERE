# News Sphere

Welcome to **News Sphere**, a full-stack (MERN) News Application that provides users with the latest articles from various categories and sources, fetches Top-headlines form various categories like Health, Entertainment , Sports , General , Scientific etc.... powered by the [NewsAPI](https://newsapi.org) and also fetches weather details from openweathermap API based on city provided.

[![NEWS_SPHERE](https://i.postimg.cc/kMb02m8b/Screenshot-4.png)](https://postimg.cc/JtR6FSpr)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [demo-video](#demo-video)

## Technologies Used

This project utilizes the following technologies:

- **Frontend:**

  - React
  - Tailwind CSS
  - CSS

- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - MongDB

## Features

- **Fetch Latest News**: Get the latest articles from various sources using the NewsAPI.
- **Top Headlines**: View the top headlines from different categories as mentioned above.
- **Country-wise News**: Access news articles filtered by country.
- **Search Functionality**: Search for articles based on keywords specified.
- **Markdown Notes**: Write your notes with title and coressponding description to refer further.
- **User Authentication**: Users can log in and sign up to save their preferences.
- **Sharing Options**: Share articles via Facebook, Twitter, and LinkedIn.

## Installation

To set up this project locally, follow these steps:

1. **Create Project Folders**:

   - Create a folder named `News_Sphere`.
   - Inside the `News_Sphere` folder, create two subfolders: `client` and `server`.

2. **Frontend Setup**:

   - Inside the `client` folder, create a React app.
     ```bash
     npx create-react-app .
     ```
   - Add your components in the React app.
   - Install Tailwind CSS or use regular CSS for styling.

3. **Backend Setup**:

   - Inside the `server` folder, create a `server.js` file as the main server file.
   - Create models for your database (e.g., `ChatMessage` schema).
   - Implement API routes to fetch data from NewsAPI and OpenWeatherMap API.
   - Set up the server to run on port 5000.
   - Store credentials (like API keys) in a `.env` file.

4. **Running the Application**:
   - Run the client React app in one terminal:
     ```bash
     npm run dev
     ```
   - Run the server in another terminal:
     ```bash
     node server.js
     ```
   - Open the frontend at [http://localhost:5173](http://localhost:5173).
   - Access the API at [http://localhost:5000/all-news](http://localhost:5000/all-news).

## DEMO-VIDEO

[News_Sphere](https://bit.ly/News_Sphere)
