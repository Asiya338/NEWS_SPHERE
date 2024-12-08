# **News Sphere**

Welcome to **News Sphere**, a comprehensive MERN stack application that keeps you informed with the latest news articles across various categories. With integration of the [NewsAPI](https://newsapi.org) and [OpenWeatherMap API](https://openweathermap.org/), it provides not only top news headlines but also real-time weather details based on user-provided city information.

[![Screenshot-9.png](https://i.postimg.cc/pXpqjTqT/Screenshot-9.png)](https://postimg.cc/ZCz8tTkt)

---

## **Table of Contents**

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

---

## **Technologies Used**

### **Frontend**

- React.js (Vite)
- Tailwind CSS
- Vanilla CSS

### **Backend**

- Node.js
- Express.js
- MongoDB

### **APIs**

- [NewsAPI](https://newsapi.org): For fetching the latest news articles and headlines.
- [OpenWeatherMap API](https://openweathermap.org): For fetching weather details based on city input.

---

### **Features**

### **Core Features**

- **Latest News**: Fetches the most recent articles from reliable sources.
- **Top Headlines**: View top headlines categorized by topics like:
  - Health
  - Entertainment
  - Sports
  - General
  - Science, and more.
- **Country-Specific News**: Access news articles filtered by country.
- **Search Functionality**: Search for articles using keywords.

### **Additional Features**

- **Weather Updates**: Get live weather updates for any city using OpenWeatherMap API.
- **Markdown Notes**: Create and store notes with titles and descriptions for future reference.
- **Sharing Options**: Share interesting articles via : LinkedIn ...

---

## **Installation**

### Prerequisites

- Node.js installed
- MongoDB Atlas server
- API keys for [NewsAPI](https://newsapi.org) and [OpenWeatherMap API](https://openweathermap.org)
- get app passwords for Mail with 2 factor verification to allow users to send feedback

### **Step:1 Clone the Repository**

```bash
git clone https://github.com/your-repo/News_Sphere.git
cd News_Sphere
```

### **Step 2: Create Project Folders**

```bash
Create two folders:
client: For the frontend React application
server: For the backend API
```

### **Step 3: Frontend Setup**

Navigate to the client folder and initialize the React app:

```bash
cd client
npx create-react-app .
Install Tailwind CSS or use your preferred styling method.
```

### **Step 4: Backend Setup**

Navigate to the server folder and create a Node.js server:

```bash
cd server
npm init -y
npm install express mysql mongoose dotenv axios cors body-parser
```

### **Step 5: Environment Variables**

Create a .env file in the server folder and add your API keys , port:

```bash
NEWS_API_KEY=your_newsapi_key
WEATHER_API_KEY=your_openweathermap_key
PORT=your_port
MONGODB_URL=your_mongodb_url
EMAIL_USER=your_email_USER
EMAIL_PASSWORD=your_email_password_with_APP_PASSWORD(16 char)
```

### **Step 6: Database Configuration**

```bash
Set up MongoDB Atlas:
For MongoDB, define models (e.g., for notes ).
```

### **Step 7: Start the Application**

Start the backend server:

```bash
node server.js
```

Start the frontend app:

```bash
npm start
```

Access the frontend at http://localhost:5173

Access the backend API at http://localhost:4000

## **Usage**

```bash
Open the application in your browser.
Browse top news headlines or search for articles.
Check weather updates by entering your city.
Use Markdown Notes to save and manage your notes.
Share news articles directly from the app.
```
