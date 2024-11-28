require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ChatMessage = require("./ChatMessage");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 5000;
const API_KEY_WEATHER = process.env.OPENWEATHER_API_KEY;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

// to recieve feedback to my email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/feedback", async (req, res) => {
  const { name, email, feedback } = req.body;
  if (!name || !email || !feedback) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all required fields" });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Feedback from ${name}`,
    text: `Name: ${name} \nEmail: ${email} \nFeedback: ${feedback}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Feedback sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send feedback" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!user || !message) {
      return res.status(400).json({ error: "User and message are required" });
    }

    const chatMessage = new ChatMessage({
      user,
      message,
    });

    await chatMessage.save();

    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "successfully fetched data",
          data: response.data,
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "no more data to fetch ",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: 500,
        success: false,
        message: "Failed to fetch data from API",
        error: error.message,
      });
    });
}

//to get all news
app.get("/all-news", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let q = req.query.q || "world";
  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    q
  )}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

// Set router for top-headlines

app.get("/top-headlines", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "business";

  let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  fetchNews(url, res);
});

//set router for news based on country
app.get("/country/:iso", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let country = req.params.iso;
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  fetchNews(url, res);
});

//set router for search

app.get("/search", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let query = req.query.q || "world";

  let url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  fetchNews(url, res);
});

//to get weather

app.get("/weather", async (req, res) => {
  const { city } = req.query; // Get the city from query parameters

  if (!city) {
    return res
      .status(400)
      .json({ success: false, message: "City is required." });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY_WEATHER}&units=metric`
    );
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather data.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); //Server is running on port 3000
});
