const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/mydb');

const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define a route to serve the signup form
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
    console.log(__dirname)
    console.log(__filename)
});

// Define a route to handle the signup form submission
app.post("/signup", async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    // Check if email or phone number already exists in the database
    const existingUser = await db.collection('users').findOne({ $or: [{ email: email }, { phno: phno }] });

    if (existingUser) {
        return res.status(400).send("User with the provided email or phone number already exists.");
    }

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/signup_success.html');
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

// app.post("/login", async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         const user = await db.collection('users').findOne({ email: email, password: password });

//         if (!user) {
//            alert('Invalid Credentials.');
//            return false;
//         }

//         return res.redirect('home_page.html');
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("An error occurred while processing your request.");
//     }
// });

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await db.collection('users').findOne({ email: email, password: password });

        if (!user) {
            // Send JSON response with success as false
            return res.json({ success: false, message: "Invalid login credentials." });
        }

        // Successful login, send JSON response with success as true
        return res.json({ success: true, message: "Login successful!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred while processing your request." });
    }
});



app.listen(3001, () => {
    console.log("Listening on PORT 3000");
});