require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const ChatMessage = require('./ChatMessage')
const nodemailer = require('nodemailer')

const axios = require('axios')
const app = express()
const bcrypt = require('bcrypt')

const mysql = require('mysql2');

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*', // Be cautious with this in production
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
const API_KEY = process.env.API_KEY
const password_db = process.env.PASSWORD_DB

const PORT = process.env.PORT || 5000
const API_KEY_WEATHER = process.env.OPENWEATHER_API_KEY;
// to recieve feedback to my email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email_USER,
        pass: process.env.Email_PASS
    }
});

app.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    // Check for missing fields
    if (!name || !email || !feedback) {
        return res.status(400).json({ success: false, message: 'Please enter all required fields' });
    }

    const mailOptions = {
        from: email, // The sender's email
        to: process.env.Email_USER, // Your email
        subject: `Feedback from ${name}`,
        text: `Name: ${name} \nEmail: ${email} \nFeedback: ${feedback}`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Feedback sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error); // Log the error for debugging
        return res.status(500).json({ success: false, message: 'Failed to send feedback' });
    }
});


//MongoDB connection
mongoose.connect("mongodb://localhost:27017/mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password_db,
    database: 'userdata'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
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
            return res
                .status(400)
                .json({ error: "User and message are required" });
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
    axios.get(url)
        .then((response) => {
            if (response.data.totalResults > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "successfully fetched data",
                    data: response.data,
                })
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: "no more data to fetch "
                })
            }
        })
        .catch((error) => {
            res.json({
                status: 500,
                success: false,
                message: "Failed to fetch data from API",
                error: error.message
            })
        })
}
//to get all news 
app.get('/all-news', (req, res) => {

    let pageSize = parseInt(req.query.pageSize) || 80
    let page = parseInt(req.query.page) || 1
    let q = req.query.q || 'world';
    let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res)
})


// Set router for top-headlines 
app.options('/top-headlines', cors())

app.get('/top-headlines', (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || 'business';

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    fetchNews(url, res);
});

//set router fornews based on country

app.options('/country/:iso', cors())
app.get('/country/:iso', (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80
    let page = parseInt(req.query.page) || 1
    let country = req.params.iso
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    fetchNews(url, res)
})

//set router for search 
app.options('/search', cors())
app.get('/search', (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80
    let page = parseInt(req.query.page) || 1
    let q = req.query.q || 'world';

    console.log(`Searching for: ${q}, Page: ${page}, PageSize: ${pageSize}`); // Log query parameters


    if (!q) {
        return res.status(400).json({ success: false, message: "Query parameter 'q' is required." });
    }
    let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    fetchNews(url, res)
})
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO userssignup (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Failed to create user.', error: error.message });
            }
            res.status(201).json({ success: true, message: 'User created successfully.' });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error hashing password.', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        // Fetch the user from the database
        db.query('SELECT * FROM userssignup WHERE username = ?', [username], async (error, results) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Database query error.', error: error.message });
            }
            if (results.length === 0) {
                return res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }

            // Check the password
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }

            // Successful login
            res.status(200).json({
                success: true, message: 'Login successful.', user: {

                    username: user.username,
                    email: user.email
                }
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during login.', error: error.message });
    }
});


app.get('/weather', async (req, res) => {
    const { city } = req.query; // Get the city from query parameters

    if (!city) {
        return res.status(400).json({ success: false, message: "City is required." });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY_WEATHER}&units=metric`);
        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch weather data.", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)  //Server is running on port 3000

})